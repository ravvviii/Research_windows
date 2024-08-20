import React, { useState } from 'react';
import { FaUpload, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UploadModal from './UploadModal'; // Import the UploadModal component

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const onProfileClick = () => {
    navigate('/profile');
  };

  const onUploadClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        {/* Centered Title */}
        <div className="flex-1 text-center text-lg font-bold">
          Research Window
        </div>

        {/* Add Button and Profile Section */}
        <div className="flex items-center space-x-10">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded flex items-center"
            onClick={onUploadClick}
          >
            <FaUpload className="mr-2" /> Upload Paper
          </button>

          <button 
            className="flex items-center space-x-2 focus:outline-none" 
            onClick={onProfileClick}
          >
            {/* Profile Icon */}
            <FaUserCircle size={30} />
            <span className="font-medium">Profile</span>
          </button>
        </div>
      </div>

      {/* Conditionally Render the Modal */}
      {isModalOpen && <UploadModal onClose={closeModal} />}
    </div>
  );
}

export default Header;
