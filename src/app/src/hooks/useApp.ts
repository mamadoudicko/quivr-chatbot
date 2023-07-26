import { useRef, useState } from "react";
import { useChat } from "./useChat";





export const useApp = () => {
  const [showModal, setShowModal] = useState(
    process.env.NODE_ENV === "development"
  );

  const [inputValue, setInputValue] = useState<string>("");
    useState(false);
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
    generatingAnswer


  };
};
