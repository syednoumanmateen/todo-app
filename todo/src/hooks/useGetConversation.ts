import { useEffect, useState } from "react";
import apiConfigAxios from './apiConfigAxios'
import userApi from "../api/userApi"

const axios = apiConfigAxios.axiosUserService;

interface Conversation {
  _id: string,
  name: string
}

const useGetConversations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const result = await axios.get(userApi.fetchAllMessages(), { withCredentials: true });
        setConversations(result.data.result.data);
      } catch (e: any) {
        console.log(e)
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;