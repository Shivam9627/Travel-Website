import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/react';
import { useAuth } from '../hooks/useAuth';
import './AuthPages.css';

const SignUp = () => {
  const { mode, signUp } = useAuth();

  if (mode !== 'clerk') {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <h1>Demo Sign Up</h1>
          <p>Create a demo traveler account without Clerk configuration.</p>
          <button className="btn btn-primary" onClick={() => signUp()}>
            Continue as Guest
          </button>
        </div>
      </div>
    );
  }

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
            },
          }}
        />
      </div>
    </div>
  );
};

export default SignUp;
