import HandleAccount from '@/components/handleAccount';
import Header from '@/components/header';
import React, { useState } from 'react';

const AccountPage: React.FC = () => {
    return (
        <>
        <Header/>
        <HandleAccount formType = "signin"/>
        </>
    )
};

export default AccountPage;