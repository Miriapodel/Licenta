"use client";

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import RouteChangeTracker from '@/helpers/RouteChangeTracker.tsx';
import "./globals.css";
import "../metadata/metadata.ts";
import metadata from '../metadata/metadata.ts';

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

  

  return (
    <html lang="en">
      <head>
       <title>{String(metadata.title)}</title>
      </head>
      <body>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <RouteChangeTracker />
          {children}
        </SessionProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}
