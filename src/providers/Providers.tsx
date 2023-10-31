import AuthContextProvider from "./AuthContextProvider";
import RoutesProvider from "./RoutesProvider";
import { AuthProvider } from "react-auth-kit";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Providers = () => {
    const queryClient = new QueryClient();
    return (

        <AuthProvider authName="auth" authType="localstorage">
            <AuthContextProvider>
                <QueryClientProvider client={queryClient}>
                    <RoutesProvider />
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </AuthContextProvider>
        </AuthProvider >

    )
}

export default Providers;
