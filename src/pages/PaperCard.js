import React from 'react';
import { FaDownload } from 'react-icons/fa'; // Import the download icon

function PaperCard({ paperName, fileUrl }) {
  // Function to truncate paper name if it exceeds 30 characters
  const truncateName = (name) => {
    if (name.length > 30) {
      return name.substring(0, 27) + '...';
    }
    return name;
  };

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-gradient-to-r bg-gray-800">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-800 flex justify-center items-center">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" 
          alt="Paper Thumbnail" 
          className="h-32 w-32" 
        />
        {/* Paper Name Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white px-4 py-1 rounded-t-lg z-20 shadow-lg">
          <div className="font-bold text-center">{truncateName(paperName)}</div>
        </div>
      </div>
      
      {/* Download Button */}
      <div className="px-6 py-4">
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          download={paperName}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded flex justify-center items-center"
        >
          <FaDownload className="mr-2" /> {/* Download icon */}
          Download
        </a>
      </div>
    </div>
  );
}

export default PaperCard;
