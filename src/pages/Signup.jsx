import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [cmsId, setCmsId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation
    if (!cmsId || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (!/^\d{11}$/.test(cmsId)) {
      setError('CMS ID must be 11-digit long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // If validation passes, proceed with signup logic
    // Call API to fetch additional details based on CMS ID
    // Upon successful signup, redirect to dashboard or login page
    // Implement this logic as per your backend requirements
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cmsId" className="block text-sm font-medium text-gray-700">CMS ID (11 digits):</label>
            <input type="text" id="cmsId" name="cmsId" value={cmsId} onChange={(e) => setCmsId(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password: </label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password: </label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className='grid justify-items-center'>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Sign Up</button>
          </div>
        </form>
        <div className="mt-4 text-gray-700">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup