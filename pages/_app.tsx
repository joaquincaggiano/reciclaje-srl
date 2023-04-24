import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SWRConfig } from "swr";
import { ThemeProvider } from "@mui/material";
import  CssBaseline from "@mui/material/CssBaseline";

import { lightTheme } from "../themes";
import { UiProvider, AuthProvider } from "@/context";

import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <UiProvider>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
