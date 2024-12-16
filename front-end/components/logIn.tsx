import CustomerService from '@/services/customer.service';
import { statusMessage } from '@/types/statusMessage';
import Router from 'next/router';
import React, { useState } from 'react';

const LogIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [statusMessage, setStatusMessage] = useState<statusMessage>(null);

    const router = Router;

    const validate = (): boolean => {
        setEmailError('');
        setPasswordError('');
        setStatusMessage(null);

        if (!email && email.trim().length === 0) {
            setEmailError('Email is required');
            return false;
        }

        if (!password && password.trim().length === 0) {
            setPasswordError('Password is required');
            return false;
        }

        setStatusMessage({ type: 'success', message: 'Redirecting to homeapge...' });

        return true;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        console.log('Form submitted with values:');
        console.log('Email:', email);
        console.log('Password:', password);

    try {
        const logIn = await CustomerService.logIn({ email, password });
        console.log(logIn);
        sessionStorage.setItem("loggedInUser", JSON.stringify(
            {
                token: logIn.token,
                fullname: logIn.fullname,
                email: email,
                role: logIn.role
            }
        ));
        setTimeout(() => {
            router.push("/");
        }, 2000);
    }
    catch (error) {
        console.error(error);
    }

  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p>{emailError}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p>{passwordError}</p>}
        </div>
        {statusMessage && <p>{statusMessage.message}</p>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LogIn;