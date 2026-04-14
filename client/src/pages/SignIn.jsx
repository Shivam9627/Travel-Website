import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/react';
import './AuthPages.css';

const SignIn = () => {
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
            }
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;
