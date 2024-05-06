import { useState } from 'react';
import apiConfigAxios from './apiConfigAxios'

const axios = apiConfigAxios.axiosTodoService;

interface response {
  displayMessage: string;
  data: any
}

interface todoData {
  name: string,
  status: string,
  description: string
}

interface todoHook {
  loading: boolean;
  fetchAllTodo: (url: string) => Promise<response | undefined>;
  createTodo: (url: string, todoData: todoData) => Promise<response | undefined>;
  fetchTodo: (url: string) => Promise<response | undefined>;
  updateTodo: (url: string, todoData: todoData) => Promise<response | undefined>;
  deleteTodo: (url: string) => Promise<response | undefined>;
}

const useTodo = (): todoHook => {
  const [loading, setLoading] = useState(false);

  const fetchAllTodo = async (url: string): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.get(url, { withCredentials: true });
      return result.data.result
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const fetchTodo = async (url: string): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.get(url, { withCredentials: true });
      return result.data.result
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const createTodo = async (url: string, todoData: todoData): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.post(url, todoData, { withCredentials: true });
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const updateTodo = async (url: string, todoData: todoData): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.put(url, todoData, { withCredentials: true });
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const deleteTodo = async (url: string): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.delete(url, { withCredentials: true });
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  return { loading, fetchAllTodo, createTodo, fetchTodo, updateTodo, deleteTodo };
};

export default useTodo;
