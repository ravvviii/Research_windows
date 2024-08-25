import React from 'react';
import { FaDownload } from 'react-icons/fa';

function PaperCard({ paperName, fileId, storage }) {
  const truncateName = (name) => {
    if (name.length > 30) {
      return name.substring(0, 27) + '...';
    }
    return name;
  };

  const handleDownload = async () => {
    try {
      // Fetch the download URL from Appwrite
      const result = await storage.getFileDownload(process.env.REACT_APP_BUCKET_ID, fileId);
      
      // Use the URL directly to download the file
      const downloadUrl = result.href; 
      window.open(downloadUrl, '_blank'); // Open the download URL in a new tab
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-gray-800">
      <div className="relative h-48 bg-gray-800 flex justify-center items-center">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" 
          alt="Paper Thumbnail" 
          className="h-32 w-32" 
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white px-4 py-1 rounded-t-lg z-20 shadow-lg">
          <div className="font-bold text-center">{truncateName(paperName)}</div>
        </div>
      </div>
      <div className="px-6 py-4 flex justify-center">
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded flex justify-center items-center"
        >
          <FaDownload className="mr-2" />
          Download
        </button>
      </div>
    </div>
  );
}

export default PaperCard;
