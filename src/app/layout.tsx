"use client";

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import "./globals.css";
import "./metadata.ts";
import metadata from './metadata.ts';

const theme = createTheme({
  palette: {
    primary: { main: '#009688' },
    background: { default: '#ffffff' },
    text: { primary: '#333333' },
  },
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!url.endsWith("/login") && !url.endsWith("/signup")) {
        localStorage.setItem("lastPage", url);
      }
    };
    
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <html lang="en">
      <head>
       <title>{String(metadata.title)}</title>
      </head>
      <body>
      <ThemeProvider theme={theme}>
      <SessionProvider>
        {children}
        </SessionProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
