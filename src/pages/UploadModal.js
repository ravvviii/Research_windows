import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Import FaSpinner from react-icons
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account, client, database, storage } from '../appwrite/config'; // Import Appwrite services

function UploadModal({ onClose }) {
  const [paperName, setPaperName] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !paperName) {
      alert("Please provide both the file and paper name.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Upload the file to Appwrite storage
      const uploadedFile = await storage.createFile(
        process.env.REACT_APP_BUCKET_ID,
        'unique()', // Generates a unique file ID
        file
      );
  
      // Get the current user
      const user = await account.get();
  
      // Construct the correct file URL
      const fileUrl = `${client.config.endpoint}/v1/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${client.config.project}`;
  
      // Save the paper details in Appwrite database
      const paperData = {
        user_id: user.$id, // Store the user ID
        paper_name: paperName,
        file_id: uploadedFile.$id,
        file_url: fileUrl, // Use the constructed file URL
      };
  
      await database.createDocument(
        process.env.REACT_APP_DB_ID, // Ensure this is defined correctly
        process.env.REACT_APP_COLLECTION_ID, // Ensure this is defined correctly
        'unique()', // Generates a unique document ID
        paperData
      );
  
      setLoading(false);
      toast.success("Paper uploaded successfully!"); // Show success message
      onClose(); // Close the modal on success
    } catch (error) {
      console.error("File upload error:", error.message); // Log the error message
      console.error("Full error details:", error); // Log the full error details
      setLoading(false);
      toast.error(`Failed to upload paper. Error: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"> {/* Updated z-index */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-60"> {/* Optional additional z-index */}
        <h2 className="text-xl font-bold mb-4">Upload Paper</h2>
        
        {/* File Upload Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Upload File:</label>
          <input
            accept="application/pdf"
            type="file" 
            className="w-full border rounded p-2"
            onChange={handleFileChange}
          />
        </div>
        
        {/* Paper Name Input Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Paper Name:</label>
          <input 
            type="text" 
            placeholder="Enter paper name" 
            className="w-full border rounded p-2"
            value={paperName}
            onChange={(e) => setPaperName(e.target.value)}
          />
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : 'Upload'}
          </button>
        </div>
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
}

export default UploadModal;
