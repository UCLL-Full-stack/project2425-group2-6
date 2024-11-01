import Header from '@/components/header';
import RegisterAccountForm from '@/components/registerAccountForm';
import React, { useState } from 'react';

const AccountPage: React.FC = () => {
    return (
        <>
        <Header/>
        <RegisterAccountForm formType = "signin"/>
        </>
    )
};

export default AccountPage;