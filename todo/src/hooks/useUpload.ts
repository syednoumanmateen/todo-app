import { useState } from 'react';
import apiConfigAxios from './apiConfigAxios'

const axios = apiConfigAxios.axiosUploadService;

interface response {
  data: any
}

interface uploadData {
  upload: any
}

interface uploadHook {
  uploadLoading: boolean;
  createUpload: (url: string, uploadData: uploadData) => Promise<response | undefined>;
}

const useUpload = (): uploadHook => {
  const [uploadLoading, setLoading] = useState(false);

  const createUpload = async (url: string, uploadData: uploadData): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.post(url, uploadData, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
      return result.data.result
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  return { uploadLoading, createUpload };
};

export default useUpload;
