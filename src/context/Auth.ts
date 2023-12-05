import { createContext } from "react";
import { IUser } from "../types/index";

export interface IAuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: (state: boolean) => void;
  user: IUser | undefined;
  setUser: (user: IUser) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
