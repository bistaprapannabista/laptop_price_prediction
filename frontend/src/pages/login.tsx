// LoginForm.tsx
import React, { useState } from 'react';
import axios from '../auth/axiosInstance';
import { login } from '../auth/authService';
import { toast } from 'react-toastify';


interface FormData {
  email: string;
  password: string;
}



const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", { email, password })
      login(response.data.access_token);
      window.location.href = "/predict"
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
    // onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-20 p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</button>
    </form>
  );
};

export default LoginPage;
