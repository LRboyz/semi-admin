import { createContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { AuthContextType, ErrorCallBackType, LoginParams, RegisterParams, UserDataType } from './types';
import { supabase } from '@/utils/supabase';
import { Toast, Notification } from '@douyinfe/semi-ui';
import { SupabaseClient } from '@supabase/auth-helpers-nextjs'

const defaultProvider: AuthContextType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve(),
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
  supabaseClient: SupabaseClient
};

const AuthProvider = ({ children, supabaseClient }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized);

  const router = useRouter();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      
      const token = localStorage.getItem('accessToken');
      if (token) { 
        setLoading(true)
        supabaseClient.auth.getSession().then(({ data, error }) => { 
          if (error) { 
              Toast.error(error.message)
          }
          setUser({ ...data.session.user })
          window.localStorage.setItem('userData', JSON.stringify(data.session.user))
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    };
    initAuth();
  }, []);

  const handleLogin = (params: LoginParams, errorCallback?: ErrorCallBackType) => {
    return supabaseClient.auth.signInWithPassword(params).then(async ({ data, error }) => {
      console.log(data, 'data login')
      if (error) {
        Toast.error(`登录失败！原因：${error.message}`);
        errorCallback ? errorCallback({ email: error.message }) : null;
      } else {
        if (data.session.access_token) {
          window.localStorage.setItem('accessToken', data.session.access_token);
          const returnUrl = router.query.returnUrl;
          setUser({ ...data.user });
          await window.localStorage.setItem('userData', JSON.stringify(data.user));
          const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/';
          router.replace(redirectURL as string);
        }
      }
    });
  };

  const handleLogout = () => {
    setUser(null);
    setIsInitialized(false);
    window.localStorage.removeItem('userData');
    window.localStorage.removeItem('accessToken');
    router.push('/login');
  };

  const handleRegister = async (params: RegisterParams) => {
    return supabase.auth.signUp(params).then(async ({ data, error }) => {
      if (error) {
        Toast.error(error.message);
      }
      if (data.user) {
        console.log(data, 'Session');
        Notification.error({
          title: 'Success!',
          content: '恭喜您账号注册成功！现在去登陆系统吧～',
          theme: 'light',
        });
        router.push('/login');
        // handleLogin({ email: params.email, password: params.password });
      }
    });
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
