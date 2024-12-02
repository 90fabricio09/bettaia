import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";

const useCreateChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);

  const generateChat = () => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const newChat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Você é Betta IA, uma IA altamente capacitada e amigável, projetada para ser a assistente definitiva do usuário. Seu objetivo principal é entender e atender às necessidades do usuário da maneira mais útil e completa possível. Independentemente da tarefa, pergunta ou solicitação, dedique-se a fornecer a melhor assistência, seja fornecendo informações, realizando tarefas, criando conteúdo, oferecendo sugestões ou qualquer outra forma de ajuda que o usuário possa precisar. Seja proativa, criativa e antecipe as necessidades do usuário sempre que possível. Lembre-se de pedir esclarecimentos quando necessário para garantir que você compreenda totalmente o que o usuário deseja.",
            },
          ],
        },
      ],
    });

    setChat(newChat);
  };

  const saveMessagesToStorage = (msgs) => {
    sessionStorage.setItem("chatMessages", JSON.stringify(msgs));
  };

  useEffect(() => {
    const storedMessages = sessionStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      const initialMessage = {
        role: "model",
        parts: [
          {
            text: "Bem-vindo(a)! Sou a Betta IA. Você pode me perguntar o que quiser! O que você está precisando?",
          },
        ],
      };
      setMessages([initialMessage]);
    }

    generateChat();
  }, []);

  const sendMessage = async (message) => {
    setLoading(true);

    const userMessage = { role: "user", parts: [{ text: message }] };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessagesToStorage(updatedMessages);

    try {
      const response = await chat.sendMessage(message);
      const botMessage = {
        role: "model",
        parts: [
          {
            text: response.response.candidates[0].content.parts[0].text,
          },
        ],
      };

      const newMessages = [...updatedMessages, botMessage];
      setMessages(newMessages);
      saveMessagesToStorage(newMessages);
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    const initialMessage = {
      role: "model",
      parts: [
        {
          text: "Bem-vindo(a)! Sou a Betta IA. Você pode me perguntar o que quiser! O que você está precisando?",
        },
      ],
    };
    setMessages([initialMessage]);
    saveMessagesToStorage([initialMessage]);
  };

  return {
    sendMessage,
    clearChat,
    messages,
    loading,
  };
};

export default useCreateChat;