import AuthContextProvider from "./AuthContextProvider";
import RoutesProvider from "./RoutesProvider";
import { AuthProvider } from "react-auth-kit";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const Providers = () => {
    const queryClient = new QueryClient();
    return (
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider authName="auth" authType="localstorage">
                    {RoutesProvider}
                </AuthProvider >
            </QueryClientProvider>
        </AuthContextProvider>
    )
}

export default Providers;
