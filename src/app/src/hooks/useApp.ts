import { useEffect, useRef, useState } from "react";
import { getSettings } from "../api/settings";
import { useSettingsView } from "../view/SettingsView/hooks/useSettingsView";
import { useBrains } from "./useBrains";
import { useChat } from "./useChat";





export const useApp = () => {
  const [showModal, setShowModal] = useState(
    process.env.NODE_ENV === "development"
  );

  const [inputValue, setInputValue] = useState<string>("");
    useState(false);

    const [showSettings,setShowSettings] = useState(false);


    const {settings} = useSettingsView() ;
    const {brains} = useBrains() ;
    

    useEffect(()=> {
      const checkConfigs = async () => {
        const settings = await getSettings() ;
        if (settings?.apiKey === undefined || 
          settings?.apiKey === "" ||
           settings?.currentBrainId === undefined 
           || settings?.currentBrainId === "") {
          setShowSettings(true)
        }
      }
      void checkConfigs()
    },[])

  const currentBrain = brains.find(brain => brain.id === settings.currentBrainId)

const {addQuestion,chatHistory,generatingAnswer} = useChat()
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClose = () => {
    setShowModal(false);
  };  

  const handleChange = async (e: { target: { value: string } }) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = async ()=> {
    addQuestion(inputValue);
    setInputValue("");
  }

 
  
  return {
    showModal,
    setShowModal,
    handleChange,
    handleClose,
    inputRef,
    chatHistory,
    inputValue,
    handleSubmit,
    generatingAnswer,
    showSettings,setShowSettings,
    currentBrain
  };
};
