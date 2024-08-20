import React from 'react';

function UploadModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Upload Paper</h2>
        
        {/* File Upload Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Upload File:</label>
          <input
            accept="application/pdf"
          type="file" className="w-full border rounded p-2" />
        </div>
        
        {/* Paper Name Input Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Paper Name:</label>
          <input 
            type="text" 
            placeholder="Enter paper name" 
            className="w-full border rounded p-2" 
          />
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
