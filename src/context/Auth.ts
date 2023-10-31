import { createContext } from "react";

export interface IAuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: (state: boolean) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
