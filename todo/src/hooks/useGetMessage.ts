
import { useEffect, useState } from "react";
import apiConfigAxios from './apiConfigAxios'
import useConversation from "../zustand/useConversation";
import messageApi from "../api/message.Api"

const axios = apiConfigAxios.axiosMessageService;

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const result = await axios.get(messageApi.receive(selectedConversation._id), { withCredentials: true });
        setMessages(result.data.result.data.messages);
      } catch (e: any) {
        console.log(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;