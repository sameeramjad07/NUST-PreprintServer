import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [cmsId, setCmsId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5173/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cmsId, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('Login Error');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cmsId" className="block text-sm font-medium text-gray-700">CMS ID:</label>
            <input type="text" id="cmsId" name="cmsId" value={cmsId} onChange={(e) => setCmsId(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="grid justify-items-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Login</button>
          </div>
        </form>
        <div className="mt-4 text-gray-700">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
