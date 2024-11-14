"use client";

import { createContext, ReactNode, useContext, useState } from 'react';
import Script from 'next/script';

interface LayoutProps{
  children: ReactNode;
}

interface GoogleContextType{
  googleLoaded: boolean;
}

const GoogleMapsContext = createContext<GoogleContextType>({googleLoaded: false});

export const useGoogleMaps = () => useContext(GoogleMapsContext);

export const GoogleMapsProvider = ({ children } : LayoutProps) => {
  const [googleLoaded, setGoogleLoaded] = useState(false);

  return (
    <GoogleMapsContext.Provider value={{googleLoaded}}>
      {children}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_PLACES_API}&libraries=places`}
        strategy="afterInteractive"
        onLoad={() => setGoogleLoaded(true)}
      />
    </GoogleMapsContext.Provider>
  );
};