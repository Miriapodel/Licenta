import { ReactNode } from 'react';
import { GoogleMapsProvider } from '../../contexts/PlacesContext';

interface SingupLayoutProps{
    children: ReactNode
}

export default function SignupLayout({children} : SingupLayoutProps) {
  return (
    <GoogleMapsProvider>
      {children}
    </GoogleMapsProvider>
  );
}
