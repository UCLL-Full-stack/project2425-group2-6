import Link from 'next/link';
import { useEffect, useState } from 'react';

import LogIn from '@/components/LogIn';
import LogOut from '@/components/LogOut';
import Header from '@/components/header';

const AccountPage = () => {
  const [user, setUser] = useState({});
  const [fullname, setFullname] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
    setUser(loggedInUser);
    setFullname(loggedInUser.fullname || '');
  }, []);

  return (
    <>
      <Header />
      <div >
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
            <LogIn />
          </div>
        )}
      </div>
    </>
  );
};

export default AccountPage;