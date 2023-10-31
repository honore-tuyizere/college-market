
import { PropsWithChildren, FC, Fragment, useState, useMemo } from 'react';
import { AuthContext } from '../context/Auth';

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [login, setLogin] = useState(false);
    const toggleLoginState = (state: boolean) => {
        setLogin(state);
    }
    const contextValue = useMemo(() => ({
        isLoggedIn: login, setIsLoggedIn: toggleLoginState
    }), [login]);
    return (
        <Fragment>
            <AuthContext.Provider value={contextValue}>
                {children}
            </AuthContext.Provider>
        </Fragment>
    )
}



export default AuthContextProvider