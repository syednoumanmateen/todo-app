import { useState } from 'react';
import apiConfigAxios from './apiConfigAxios'

const axios = apiConfigAxios.axiosBlogService;

interface response {
  data: any
}


interface categoryHook {
  categoryLoading: boolean;
  fetchAllCategory: (url: string) => Promise<response | undefined>;
}

const useBlog = (): categoryHook => {
  const [categoryLoading, setLoading] = useState(false);

  const fetchAllCategory = async (url: string): Promise<response | undefined> => {
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

  return { categoryLoading, fetchAllCategory };
};

export default useBlog;
