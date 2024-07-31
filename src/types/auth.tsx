import { User } from 'firebase/auth'
import { UserType } from './user';
import type { DiaryModelProps } from './diary';

export interface AuthContextType {
  user: User | null;
  infoUser: UserType | null | undefined;
  getUserInfo: () => Promise<void>;
  sendDiaryData: (diaryData: DiaryModelProps) => Promise<void>;
  loading: boolean;

  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;

  signIn: (email: string, password: string) => Promise<void>;
  createAccount: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  showNavbar: boolean;
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  //...
}

export type AuthMode = 'LOGIN' | 'REGISTER'