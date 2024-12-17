import React, { useState } from 'react';
import LogOut from './logOut';
import SignUp from './SignUp';
import LogIn from './logIn';

const AccountNotSignedIn: React.FC = () => {

    const [showSignUp, setShowSignUp] = useState(false);
const handleSignUpSuccess = () => {
    setShowSignUp(false);
  };

    return (
        <>
        {showSignUp ? (
                      <SignUp onSignUpSuccess={handleSignUpSuccess} />
                    ) : (
                      <LogIn />
                    )}
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => setShowSignUp(!showSignUp)}
                        className="w-1/3 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 text-center"
                        >
                        {showSignUp ? 'Log In' : 'Sign Up'}
                      </button>
                    
                  </div>
        </>
    );
};

export default AccountNotSignedIn;