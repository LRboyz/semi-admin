import { User } from '@supabase/supabase-js';

export type ErrorCallBackType = (error: { [key: string]: string }) => void;

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  email: string;
  password: string;
};

export interface UserDataType extends User {
  name?: string;
}

export type AuthContextType = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  logout: () => void;
  isInitialized: boolean;
  user: UserDataType | null;
  setUser: (value: UserDataType | null) => void;
  setIsInitialized: (value: boolean) => void;
  login: (params: LoginParams, errorCallback?: ErrorCallBackType) => Promise<void>;
  register: (params: RegisterParams, errorCallback?: ErrorCallBackType) => Promise<void>;
};
