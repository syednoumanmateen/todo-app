import { useState } from "react";
import useConversation from "../zustand/useConversation";
import messageApi from "../api/message.Api"
import apiConfigAxios from './apiConfigAxios'

const axios = apiConfigAxios.axiosMessageService;

interface ResponseData { }

interface MessageHook {
  loading: boolean;
  sendMessage: (message: string) => Promise<ResponseData | undefined>;
}

const useSendMessage = (): MessageHook => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string): Promise<ResponseData | undefined> => {
    try {
      setLoading(true);
      const result = await axios.post(messageApi.send(selectedConversation._id), { message: message }, { withCredentials: true });
      setMessages([...messages, result.data.result.data]);
      return result.data;
    } catch (e: any) {
      console.log(e);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
