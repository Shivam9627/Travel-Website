import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/react';
import './AuthPages.css';

const SignUp = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <ClerkSignUp 
          signInUrl="/sign-in" 
          routing="path" 
          path="/sign-up"
          afterSignUpUrl="/"
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

export default SignUp;
