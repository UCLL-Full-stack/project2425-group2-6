import Header from "@/components/header";
import LogIn from "@/components/logIn";
import LogOut from "@/components/logOut";
import { useEffect, useState } from 'react';

const Account: React.FC = () => {
    const [user, setUser] = useState(null);
    const [fullname, setFullname] = useState('');

    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser') || '{}');
        setUser(loggedInUser);
        setFullname(loggedInUser.fullname || '');
    }, []);

    return (
        <>
            <Header/>

            <h1 className="text-center mb-10 font-bold">Account</h1>

            {fullname.length > 0 ? (
                <h2 className="text-center mb-10">View your account details, {fullname ? fullname.split(" ")[0] : ''}</h2>
            ) : (
                <LogIn/>
            )}

            {fullname.length > 0 && (
                <div className="text-center mb-10  font-bold">
                    <LogOut/>
                </div>
            )}

        </>
    )
}

export default Account;