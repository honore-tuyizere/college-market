import AuthContextProvider from "./AuthContextProvider";
import RoutesProvider from "./RoutesProvider";
import { AuthProvider } from "react-auth-kit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChatProvider } from "./ChatContextProvider";

const Providers = () => {
  const queryClient = new QueryClient();
  return (
    <AuthProvider authName='auth' authType='cookie'>
      <AuthContextProvider>
        <ChatProvider>
          <QueryClientProvider client={queryClient}>
            <RoutesProvider />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ChatProvider>
      </AuthContextProvider>
    </AuthProvider>
  );
};

export default Providers;
