import { useEffect, useState } from 'react';
import LogIn from '@/components/logIn';
import LogOut from '@/components/logOut';
import Header from '@/components/header';
import SignUp from '@/components/signUp';
import AccountHeading from '@/components/accountHeading';
import AccountSignedIn from '@/components/accountSignedIn';
import AccountNotSignedIn from '@/components/accountNotSignedIn';
import AccountPageComponent from '@/components/accountPageComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
const Account: React.FC = () => {

  return (
    <>
      <Header />
      <AccountPageComponent/>
    </>
  );
};

export default Account;

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});