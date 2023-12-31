import { PropsWithChildren, FC, useState, useMemo } from "react";
import { AuthContext } from "../context/Auth";
import { IUser } from "../types/index";

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<IUser>();
  const toggleLoginState = (state: boolean) => {
    setLogin(state);
  };
  const setUserProfile = (profile: IUser) => {
    setUser(profile);
  };
  const contextValue = useMemo(
    () => ({
      isLoggedIn: login,
      setIsLoggedIn: toggleLoginState,
      user: user,
      setUser: setUserProfile,
    }),
    [login, user],
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
