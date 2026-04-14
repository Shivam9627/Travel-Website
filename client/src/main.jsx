import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/react';
import { ui } from '@clerk/ui';
import App from './App';
import './index.css';
import { ClerkAuthInner } from './context/AuthContext';
import { suppressClerkWarnings } from './utils/suppressClerkWarnings';

// Suppress Clerk development warnings in development mode
suppressClerkWarnings();

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey} ui={ui} appearance={{ 
      variables: { 
        colorPrimary: '#3b82f6',
        colorDanger: '#ef4444'
      }
    }}>
      <ClerkAuthInner>
        <App />
      </ClerkAuthInner>
    </ClerkProvider>
  </React.StrictMode>
);
