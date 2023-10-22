import useSWR from 'swr';
import axios, { csrf } from '@/lib/axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAxiosError } from 'axios';

declare type AuthMiddleware = 'auth' | 'guest';

export type AuthErrors = {
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
  current_password?: string[];
  name?: string[];
};

interface IUseAuth {
  middleware?: AuthMiddleware;
  redirectIfAuthenticated?: string;
  redirectIfNotAuthenticated?: string;
}

interface IApiRequest {
  setErrors: React.Dispatch<React.SetStateAction<AuthErrors>>;
  setStatus: React.Dispatch<React.SetStateAction<any | null>>;
  [key: string]: any;
}

export type UserSettings = {
  categories?: string[];
  sources?: string[];
  countries?: string[];
  languages?: string[];
};

export interface User {
  id?: number;
  name: string;
  email: string;
  email_verified_at?: string;
  must_verify_email?: boolean; // this is custom attribute
  created_at?: string;
  updated_at?: string;
  settings?: UserSettings;
}

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
  redirectIfNotAuthenticated,
}: IUseAuth = {}) => {
  const router = useRouter();

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR<User>('/api/user', async () => {
    try {
      const { data } = await axios.get('/api/user');
      return data.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          await router.push('/verify-email');
        }
        if (error.response.status === 401) {
          return null;
        }
      }
      throw error;
    }
  });

  const register = async (args: IApiRequest) => {
    const { setErrors, ...props } = args;

    await csrf();

    setErrors({});

    try {
      await axios.post('/register', props);
      mutate();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      }
      throw error;
    }
  };

  const login = async (args: IApiRequest) => {
    const { setErrors, setStatus, ...props } = args;

    await csrf();

    setErrors({});
    setStatus(null);

    try {
      await axios.post('/login', props);
      mutate();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      }
      throw error;
    }
  };

  const forgotPassword = async (args: IApiRequest) => {
    const { setErrors, setStatus, email } = args;
    await csrf();

    setErrors({});
    setStatus(null);

    try {
      const { data } = await axios.post('/forgot-password', { email });
      setStatus(data.status);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      }
      throw error;
    }
  };

  const resetPassword = async (args: IApiRequest) => {
    const { setErrors, setStatus, ...props } = args;
    await csrf();

    setErrors({});
    setStatus(null);

    try {
      const { data } = await axios.post('/reset-password', {
        token: router.query.token,
        ...props,
      });
      router.push('/login?reset=' + btoa(data.status));
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status !== 422) throw error;
        setErrors(error.response.data.errors);
      }
      throw error;
    }
  };

  const resendEmailVerification = async (args: IApiRequest) => {
    const { setStatus } = args;

    const { data } = await axios.post('/email/verification-notification');
    setStatus(data.status);
  };

  const logout = async () => {
    if (!error) {
      await axios.post('/logout');
      mutate();
    }
  };

  useEffect(() => {
    if (!middleware) return;
    if (middleware === 'guest' && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (
      window.location.pathname === '/verify-email' &&
      user?.email_verified_at &&
      redirectIfAuthenticated
    )
      router.push(redirectIfAuthenticated);
    if (middleware === 'auth' && error) {
      if (redirectIfNotAuthenticated) router.push(redirectIfNotAuthenticated);
      else logout();
    }
  }, [user, error]);

  return {
    user,
    isLoading,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
