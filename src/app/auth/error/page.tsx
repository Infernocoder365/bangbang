'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  // Map error codes to user-friendly messages
  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'You do not have permission to sign in.';
      case 'Verification':
        return 'The verification link is invalid or has expired.';
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
      case 'EmailCreateAccount':
      case 'Callback':
        return 'There was a problem with the authentication service.';
      case 'OAuthAccountNotLinked':
        return 'This email is already associated with another account. Please sign in using the original provider.';
      case 'EmailSignin':
        return 'The email could not be sent.';
      case 'CredentialsSignin':
        return 'The email or password you entered is incorrect.';
      case 'SessionRequired':
        return 'Please sign in to access this page.';
      default:
        return 'An unknown error occurred.';
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Authentication Error</h1>
      
      <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
        <p className="font-medium mb-2">Error: {error || 'Unknown'}</p>
        <p>{getErrorMessage(error)}</p>
      </div>
      
      <div className="flex flex-col space-y-4">
        <Link 
          href="/auth/signin"
          className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-800 transition-colors text-center"
        >
          Back to Sign In
        </Link>
        
        <Link 
          href="/"
          className="w-full bg-gray-200 text-gray-800 py-2 rounded font-medium hover:bg-gray-300 transition-colors text-center"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}