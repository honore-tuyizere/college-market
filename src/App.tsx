import AppProviders from "./providers/Providers";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <AppProviders />
      <Toaster />
    </>
  );
};

export default App;
