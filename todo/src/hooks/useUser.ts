import { useState } from 'react';
import apiConfigAxios from './apiConfigAxios'

const axios = apiConfigAxios.axiosUserService;

interface siginUpData {
  email: string;
  name: string;
  gender: string;
  password: string;
}

interface signInData {
  email: string;
  password: string;
}

interface reloadData {
  token: string
}

interface forgotPasswordData {
  email: string;
}

interface resetPasswordData {
  password: string;
}

interface profileResponse {
  data: any
}

interface response {
  displayMessage: string;
  result: any
}

interface userHook {
  loading: boolean;
  signUp: (url: string, userData: siginUpData) => Promise<response | undefined>;
  signIn: (url: string, userData: signInData) => Promise<response | undefined>;
  reload: (url: string, userData: reloadData) => Promise<response | undefined>;
  profile: (url: string) => Promise<profileResponse | undefined>;
  forgotPassword: (url: string, userData: forgotPasswordData) => Promise<response | undefined>;
  resetPassword: (url: string, userData: resetPasswordData) => Promise<response | undefined>;
  signOut: (url: string) => Promise<response | undefined>;
}

const useUser = (): userHook => {
  const [loading, setLoading] = useState(false);

  const signUp = async (url: string, userData: siginUpData): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.post(url, userData);
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (url: string, userData: signInData): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.post(url, userData);
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  const reload = async (url: string, userData: reloadData): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.post(url, userData);
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  const profile = async (url: string): Promise<profileResponse | undefined> => {
    try {
      setLoading(true);
      const result = await axios.get(url, { withCredentials: true });
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (url: string, userData: forgotPasswordData): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.post(url, userData);
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (url: string, userData: resetPasswordData): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.post(url, userData);
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (url: string): Promise<response | undefined> => {
    try {
      setLoading(true);
      const result = await axios.post(url);
      return result.data
    } catch (e: any) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUp, signIn, reload, profile, forgotPassword, resetPassword, signOut };
};

export default useUser;
