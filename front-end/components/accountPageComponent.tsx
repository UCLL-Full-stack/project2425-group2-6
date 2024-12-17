import React, { useEffect, useState } from 'react';
import AccountHeading from './accountHeading';
import AccountSignedIn from './accountSignedIn';
import AccountNotSignedIn from './accountNotSignedIn';

const AccountPageComponent: React.FC = () => {

    const [fullname, setFullname] = useState('');

      useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
        // setUser(loggedInUser);
        setFullname(loggedInUser.fullname || '');
      }, []);

return (
    <>
      <div>
        <AccountHeading/>
        {fullname.length > 0 ? (
          
            <AccountSignedIn fullname={fullname}/>
          
        ) : (
          
            <AccountNotSignedIn/>
        )}
      </div>
    </>
  );
};
export default AccountPageComponent;