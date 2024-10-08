import "@/styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/data/context/AuthContex";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
       <Component {...pageProps} />
    </AuthProvider>
  )
}
