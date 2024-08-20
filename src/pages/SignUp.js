import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account } from '../appwrite/config';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        await account.get(); // Attempt to get the current user's account info
        navigate('/'); // If the user is logged in, redirect to the home page
      } catch (error) {
        console.log('User not logged in:', error);
        // User is not logged in, so we allow them to sign up
      }
    };

    checkUser();
  }, [navigate]);

  const notifyAccountCreate = () => {
    toast.success("Account created Successfully!", {
      position: "top-center",
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

  const handleFormSignup = async (e) => {
    e.preventDefault();
    setButtonLoading(true); // Start button loading

    if (name === '' || email === '' || password === '') {
      setError('Please enter all details.');
      setButtonLoading(false); // Stop button loading
      return;
    }

    try {
      await register(); // Wait for registration to complete
    } catch (error) {
      setButtonLoading(false); // Stop button loading on error
      setError('Registration failed. Please try again.');
    }
  };

  const register = async () => {
    try {
      const userDetails = await account.create('unique()', email, password, name);
      console.log('User registered:', userDetails);
      notifyAccountCreate();
      setTimeout(() => {
        navigate('/'); // Navigate to the desired page on successful registration
      }, 1000);
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
      throw error; // Rethrow the error to be caught in handleFormSignup
    } finally {
      setButtonLoading(false); // Stop button loading once the registration process is complete
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-5 text-center text-blue-600">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleFormSignup}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">UID</label>
            <input
            placeholder='UID'
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
            placeholder='Email'
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
            placeholder='Password'
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 flex justify-center items-center"
            disabled={buttonLoading}
          >
            {buttonLoading ? (
              <ClipLoader size={20} color={"#ffffff"} />
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Already have an account? <a href="/" className="text-blue-600 hover:underline">Sign In</a>
        </p>
      </div>

      <ToastContainer
        position="top-center"
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

export default SignUp;
