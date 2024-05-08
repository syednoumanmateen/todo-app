import { useState } from 'react';
import apiConfigAxios from './apiConfigAxios'

const axios = apiConfigAxios.axiosExpenseService;

interface response {
  displayMessage: string
  data: any
}

interface expenseData {
  name: string
  category: string
  description: string
  amount: number
  type: string
}


interface expenseHook {
  loading: boolean;
  fetchAllExpense: (url: string) => Promise<response | undefined>;
  fetchExpense: (url: string) => Promise<response | undefined>;
  createExpense: (url: string, expenseData: expenseData) => Promise<response | undefined>;
  updateExpense: (url: string, expenseData: expenseData) => Promise<response | undefined>;
  deleteExpense: (url: string) => Promise<response | undefined>;
}

const useBlog = (): expenseHook => {
  const [loading, setLoading] = useState(false);

  const fetchAllExpense = async (url: string): Promise<response | undefined> => {
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

  const fetchExpense = async (url: string): Promise<response | undefined> => {
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

  const createExpense = async (url: string, expenseData: expenseData): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.post(url, expenseData, { withCredentials: true });
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const updateExpense = async (url: string, expenseData: expenseData): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.put(url, expenseData, { withCredentials: true });
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const deleteExpense = async (url: string): Promise<response | undefined> => {
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

  return { loading, fetchAllExpense, fetchExpense, createExpense, updateExpense, deleteExpense };
};

export default useBlog;
