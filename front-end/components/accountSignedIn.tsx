import React from 'react';
import LogOut from './logOut';

type AccountHeadingProps = {
    fullname: string;
};

const AccountSignedIn: React.FC<AccountHeadingProps> = ({fullname}) => {
    return (
        <>
        <h2 className="text-center text-2xl mb-10">
                      View your account details, {fullname ? fullname.split(" ")[0] : ''}
                    </h2>
                    <div className="text-center mb-10">
                      <LogOut />
                    </div>
        </>
    );
};

export default AccountSignedIn;