"use client";
import React from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { Provider as ReduxProvider } from 'react-redux';
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { store } from '../../redux/store';
export default function Providers({
  session,
  children,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
}) {
  {/* disabling auth for now  */}
  return (
    <>
      <ReduxProvider store={store}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider session={session}>
            {children}
          </SessionProvider>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}

