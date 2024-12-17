import { useEffect, useState } from 'react';
import LogIn from '@/components/LogIn';
import LogOut from '@/components/LogOut';
import Header from '@/components/Header';
import SignUp from '@/components/SignUp';

const AccountPage = () => {
  const [user, setUser] = useState({});
  const [fullname, setFullname] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
    setUser(loggedInUser);
    setFullname(loggedInUser.fullname || '');
  }, []);

  return (
    <>
      <Header />
      <div>
        <h1 className="text-center text-4xl font-bold mb-10">Account</h1>
        {fullname.length > 0 ? (
          <>
            <h2 className="text-center text-2xl mb-10">
              View your account details, {fullname ? fullname.split(" ")[0] : ''}
            </h2>
            <div className="text-center mb-10">
              <LogOut />
            </div>
          </>
        ) : (
          <div>
            {showSignUp ? (
              <SignUp />
            ) : (
              <LogIn />
            )}
            <div className="flex justify-center mt-4">
                <button
                onClick={() => setShowSignUp(!showSignUp)}
                className="w-1/3 py-3 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition duration-150 focus:outline-none focus:ring-2 focus:ring-gray-200 text-center"
                >
                {showSignUp ? 'Log In' : 'Sign Up'}
                </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountPage;