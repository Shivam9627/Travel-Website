import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/react';
import { ui } from '@clerk/ui';
import App from './App';
import './index.css';
import { ClerkAuthInner, MockAuthProvider } from './context/AuthContext';
import { suppressClerkWarnings } from './utils/suppressClerkWarnings';

// Suppress Clerk development warnings in development mode
suppressClerkWarnings();

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const isClerkEnabled = Boolean(clerkPublishableKey);

const RootProvider = ({ children }) => {
  if (isClerkEnabled) {
    return (
      <ClerkProvider
        publishableKey={clerkPublishableKey}
        ui={ui}
        appearance={{
          variables: {
            colorPrimary: '#3b82f6',
            colorDanger: '#ef4444',
          },
        }}
      >
        <ClerkAuthInner>{children}</ClerkAuthInner>
      </ClerkProvider>
    );
  }

  return <MockAuthProvider>{children}</MockAuthProvider>;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </React.StrictMode>
);
