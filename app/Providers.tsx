"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ 
  children,
  session 
}: { 
  children: React.ReactNode,
  session: any
}) {
  return (
    <SessionProvider 
      session={session}
      refetchInterval={5 * 60} // Refresh every 5 minutes
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}