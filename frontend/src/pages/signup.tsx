import React, { useState } from 'react';
import axios from '../auth/axiosInstance';
import { toast } from 'react-toastify';


interface FormData {
  username: string;
  email: string;
  password: string;
}


const SignupPage: React.FC = () => {
  const [username, setusername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post("/signup", { username, email, password })
      toast.success(response.data.message);
      window.location.href = '/login';
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword == password)
      handleSignup();
    else
      toast.error("Password doesn't match.")
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mt-20 mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">User Name</label>
        <input type="text" id="username" value={username} onChange={(e) => setusername(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Confirm Password</label>
        <input type="password" id="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md" required />
      </div>
      <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Sign Up</button>
    </form>
  );
};

export default SignupPage;
