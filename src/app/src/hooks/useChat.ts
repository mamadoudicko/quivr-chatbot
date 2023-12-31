/* eslint-disable max-lines */
import { AxiosError } from "axios";
import { useState } from "react";
import { useAxios } from "../utils/useAxios";


export type ChatHistory = {
  chat_id: string;
  message_id: string;
  user_message: string;
  assistant: string;
  message_time: string;
};

export const useChat = (brainId:string | undefined) => {
  const [chatId, setChatId] = useState<string>();

  
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [chatHistory,setChatHistory] = useState<ChatHistory[]>(
    [{
    chat_id: "chat-welcome-1",
    message_id: "message-welcome-1",
    user_message: "",
    assistant: "Comment puis-je vous aider ?",
    message_time: "",
  }
] 
  );

const {axiosInstance} = useAxios()

  const addQuestion = async (question: string) => {
    const chatQuestion = {
     
      question,
    };

    try {
      setGeneratingAnswer(true);

      let currentChatId = chatId;

      if (currentChatId === undefined) {
        const chatName = question.split(" ").slice(0, 3).join(" ");
         const createdChat = (
    await axiosInstance.post("/chat", { name: chatName })
  ).data;

        currentChatId = createdChat.chat_id;
        setChatId(currentChatId);
      }

        const response = (await axiosInstance.post(
    `/chat/${currentChatId}/question?brain_id=${brainId}`,
    chatQuestion
  )).data;  

  setChatHistory((prevChatHistory) => [...prevChatHistory, response]);
     

    } catch (error) {
      console.error({ error });

      if ((error as AxiosError).response?.status === 429) {
       
        return;
      }

      
    } finally {
      setGeneratingAnswer(false);
    }
  };

  return {
    history,
    addQuestion,
    generatingAnswer,
    chatHistory
  };
};
