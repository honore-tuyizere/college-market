import { PropsWithChildren, FC, useState, useMemo } from "react";
import { AuthContext } from "../context/Auth";
import { IUser } from "../types";

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<IUser>();
  const toggleLoginState = (state: boolean) => {
    setLogin(state);
  };
  const setUserProfile = (profile: IUser) => {
    setUser(profile);
    console.log(profile);
  };
  const contextValue = useMemo(
    () => ({
      isLoggedIn: login,
      setIsLoggedIn: toggleLoginState,
      user: user,
      setUser: setUserProfile,
    }),
    [],
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
