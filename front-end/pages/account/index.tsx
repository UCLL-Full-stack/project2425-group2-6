import { useEffect, useState } from 'react';
import LogIn from '@/components/logIn';
import LogOut from '@/components/logOut';
import Header from '@/components/header';
import SignUp from '@/components/signUp';
import AccountHeading from '@/components/accountHeading';
import AccountSignedIn from '@/components/accountSignedIn';
import AccountNotSignedIn from '@/components/accountNotSignedIn';
import AccountPageComponent from '@/components/accountPageComponent';

const Account: React.FC = () => {

  return (
    <>
      <Header />
      <AccountPageComponent/>
    </>
  );
};

export default Account;