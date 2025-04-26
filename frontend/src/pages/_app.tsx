import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";  // Import ToastContainer
import type { AppProps } from "next/app";
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer /> {/* Add ToastContainer here */}
    </>
  );
}
