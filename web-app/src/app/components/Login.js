'use client'
import { useState } from 'react';
import { auth,googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import Dashboard from './Dashboard';

const Login = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
      console.log(user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <div>
      {user ? (
       <Dashboard/>
      ) : (
        <div className='min-h-screen flex items-center justify-center'>
          <button onClick={handleLogin} className="w-1/2 flex items-center justify-center px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-50 transition-all">
          <svg width="40px" height="40px" viewBox="0 0 0.8 0.8" xmlns="http://www.w3.org/2000/svg" fill="none">
            <path fill="#4285F4" d="M0.745 0.408c0 -0.024 -0.002 -0.048 -0.006 -0.071h-0.332v0.135h0.19a0.162 0.162 0 0 1 -0.07 0.106v0.088h0.113c0.067 -0.061 0.105 -0.151 0.105 -0.258"/>
            <path fill="#34A853" d="M0.407 0.75c0.095 0 0.175 -0.031 0.233 -0.085l-0.113 -0.087c-0.032 0.021 -0.072 0.033 -0.12 0.033 -0.092 0 -0.17 -0.062 -0.198 -0.144H0.093v0.09A0.352 0.352 0 0 0 0.407 0.75"/>
            <path fill="#FBBC04" d="M0.209 0.467a0.209 0.209 0 0 1 0 -0.134V0.243H0.092a0.349 0.349 0 0 0 0 0.314z"/>
            <path fill="#EA4335" d="M0.407 0.189a0.192 0.192 0 0 1 0.135 0.053l0.1 -0.1a0.34 0.34 0 0 0 -0.236 -0.091 0.352 0.352 0 0 0 -0.315 0.193L0.209 0.333c0.028 -0.083 0.106 -0.145 0.198 -0.145z"/>
          </svg> &nbsp;
            <span className="text-[20px] leading-[20px] text-[#374151]">Sign in with Google</span>
        </button>
        </div>
      )}
    </div>
  );
};

export default Login;
