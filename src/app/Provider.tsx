"use client";
import { NextUIProvider } from "@nextui-org/react";
import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Setting Up The NextUi Library Provide To Make it
 * Work it has to be client component
 * also Wrap the application in SessionProvider to make
 * next/auth session available to all client components
 */
const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
};
export default Providers;
