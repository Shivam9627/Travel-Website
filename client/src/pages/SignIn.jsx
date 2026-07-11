import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/react';
import { useAuth } from '../hooks/useAuth';
import './AuthPages.css';

const SignIn = () => {
  const { mode, signIn } = useAuth();

  if (mode !== 'clerk') {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <h1>Demo Sign In</h1>
          <p>Clerk is not configured. Continue in demo mode to use the app.</p>
          <button className="btn btn-primary" onClick={() => signIn()}>
            Continue as Guest
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <ClerkSignIn
          signUpUrl="/sign-up"
          routing="path"
          path="/sign-in"
          afterSignInUrl="/"
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-primary-dark',
              card: 'shadow-xl rounded-2xl border-none',
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
