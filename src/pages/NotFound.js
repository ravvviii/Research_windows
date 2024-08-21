// src/pages/NotFound.js
import React from 'react';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-lg text-gray-700">Page Not Found</p>
      <a href="/" className="text-indigo-600 hover:underline mt-4">
        Go back to Home
      </a>
    </div>
  );
}

export default NotFound;
