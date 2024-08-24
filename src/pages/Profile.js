import { Query } from 'appwrite';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account, client, database, storage } from '../appwrite/config';
import PaperCard from './PaperCard'; // Import PaperCard component

function Profile() {
  const [papers, setPapers] = useState([]);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingImageUpload, setLoadingImageUpload] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndPapers = async () => {
      try {
        // Fetch the current user session
        const user = await account.get();
        if (user) {
          setEmail(user.email || '');
          setName(user.name || '');
          if (user.prefs && user.prefs.profileImage) {
            setProfileImage(user.prefs.profileImage);
          }

          // Fetch documents by user email
          const documents = await fetchDocuments(user.email);
          const fetchedPapers = documents.map((doc) => ({
            id: doc.$id,
            title: doc.paper_name,
            url: `${client.config.endpoint}/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${doc.file_id}/view?project=${client.config.project}`,
          }));

          setPapers(fetchedPapers);
        } else {
          navigate('/signin');
        }
      } catch (error) {
        console.error('Error fetching user or papers:', error);
        navigate('/signin');
      }
    };

    fetchUserAndPapers();
  }, [navigate]);

  const fetchDocuments = async (userEmail) => {
    try {
      const response = await database.listDocuments(
        process.env.REACT_APP_DB_ID,
        process.env.REACT_APP_COLLECTION_ID,
        [Query.equal('email', userEmail)] // Filter documents by user email
      );
      return response.documents;
    } catch (error) {
      console.error("Error fetching documents:", error);
      return [];
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      await account.deleteSession('current');
      toast.success("Logout Successful!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => navigate('/signin'),
      });
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      setLoadingLogout(false);
    }
  };

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoadingImageUpload(true);
      try {
        const user = await account.get();
        if (user.prefs.profile_image_fileId) {
          await storage.deleteFile(process.env.REACT_APP_BUCKET_ID, user.prefs.profile_image_fileId);
        }
        const uploadedFile = await storage.createFile(process.env.REACT_APP_BUCKET_ID, 'unique()', file);
        const imageUrl = `${client.config.endpoint}/storage/buckets/${process.env.REACT_APP_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${client.config.project}`;

        await account.updatePrefs({
          profile_image: imageUrl,
          profile_image_fileId: uploadedFile.$id,
        });

        setProfileImage(imageUrl);
        toast.success("Profile image updated successfully!");
      } catch (error) {
        console.error('Image upload error:', error);
        toast.error(`Failed to upload profile image. Error: ${error.message}`);
      } finally {
        setLoadingImageUpload(false);
      }
    }
  };

  return (
    <div className='bg-gray-800'>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        {/* Profile Info */}
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300"
            />
            {loadingImageUpload && (
              <div className="absolute inset-0 flex items-center justify-center">
                <FaSpinner className="animate-spin text-gray-500" />
              </div>
            )}
          </div>

          <div className="flex-1 ml-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold text-gray-700">UID</p>
              <p>{name}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold text-gray-700">Email</p>
              <p>{email}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold text-gray-700">Role</p>
              <p>Student</p> {/* Replace with actual role */}
            </div>
            <div className="bg-white p-4 rounded shadow">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                onClick={handleLogout}
                disabled={loadingLogout}
              >
                {loadingLogout ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  'Logout'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Change Profile Button */}
        <div className="mt-4 flex justify-center">
          <label htmlFor="profileImageUpload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Change Profile
          </label>
          <input
            id="profileImageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={loadingImageUpload}
          />
        </div>
                  <div><h1 className=' font-bold text-gray-700'>My papers</h1></div>
        {/* Display Papers */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.length > 0 ? (
            papers.map((paper) => (
              <PaperCard
                key={paper.id}
                paperName={paper.title}
                fileId={paper.fileId}
              />
            ))
          ) : (
            <div className="col-span-3 text-center bg-white p-4 rounded shadow">
              <p>No papers uploaded</p>
            </div>
          )}
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

export default Profile;
