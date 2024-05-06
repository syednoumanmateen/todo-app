import { useState } from 'react';
import apiConfigAxios from './apiConfigAxios'

const axios = apiConfigAxios.axiosBlogService;

interface response {
  displayMessage: string;
  data: any
}

interface blogData {
  title: string,
  summary: string,
  cover: string,
  description: string,
  cateegory: string
}

interface blogHook {
  loading: boolean;
  fetchAllBlog: (url: string) => Promise<response | undefined>;
  createBlog: (url: string, blogData: blogData) => Promise<response | undefined>;
  fetchBlog: (url: string) => Promise<response | undefined>;
  updateBlog: (url: string, blogData: blogData) => Promise<response | undefined>;
  deleteBlog: (url: string) => Promise<response | undefined>;
}

const useBlog = (): blogHook => {
  const [loading, setLoading] = useState(false);

  const fetchAllBlog = async (url: string): Promise<response | undefined> => {
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

  const fetchBlog = async (url: string): Promise<response | undefined> => {
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

  const createBlog = async (url: string, blogData: blogData): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.post(url, blogData, { withCredentials: true });
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const updateBlog = async (url: string, blogData: blogData): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.put(url, blogData, { withCredentials: true });
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const deleteBlog = async (url: string): Promise<response | undefined> => {
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

  return { loading, fetchAllBlog, createBlog, fetchBlog, updateBlog, deleteBlog };
};

export default useBlog;
