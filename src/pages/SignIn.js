import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account } from '../appwrite/config';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const notifyLogin = () => {
    toast.success("Login Successful!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    console.log("Toast is working");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (email === '' || password === '') {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      await login();
    } catch (error) {
      setLoading(false);
      if (error.message.includes('Invalid credentials')) {
        setError('Email and password are incorrect.');
      } else {
        setError(`Unexpected error: ${error.message}. Please try again later.`);
        console.error('Unexpected error details:', error);
      }
    }
  };

  const login = async () => {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      console.log('Login successful:', response);
      notifyLogin();
      setTimeout(() => {
        navigate('/research');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center text-indigo-600">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"

              placeholder='Email'
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder='Password'
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={20} color={"#ffffff"} />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">Don't have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign Up</a></p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default SignIn;
