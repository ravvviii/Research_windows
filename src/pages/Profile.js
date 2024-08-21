import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon from react-icons
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account, storage } from '../appwrite/config'; // Assuming you have a storage setup in Appwrite

function Profile() {
  const [papers, setPapers] = useState([]);
  const [loadingLogout, setLoadingLogout] = useState(false); // State to manage loading spinner for logout
  const [loadingImageUpload, setLoadingImageUpload] = useState(false); // State to manage loading spinner for image upload
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150'); // Default profile image
  const navigate = useNavigate();

  const notifyLogout = () => {
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
      onClose: () => navigate('/signin'), // Redirect to sign-in after toast
    });
  };

  useEffect(() => {
    // Mock function to fetch uploaded papers
    const fetchUploadedPapers = async () => {
      // Replace this with actual API call to fetch papers for the logged-in user
      const uploadedPapers = [
        // Sample data, replace with actual data from your backend
        { id: 1, title: "Research Paper 1", url: "#" },
        { id: 2, title: "Research Paper 2", url: "#" }
      ];

      // Simulate fetching delay
      setTimeout(() => {
        setPapers(uploadedPapers);
      }, 1000);

      // Fetch user details
      const checkLoginStatus = async () => {
        try {
          const user = await account.get('current');
          if (user) {
            setEmail(user.email || '');
            setName(user.name || '');
            // If user has a profile image URL, update the profile image
            if (user.prefs && user.prefs.profileImage) {
              setProfileImage(user.prefs.profileImage);
            }
          } else {
            navigate('/signin');
          }
        } catch (error) {
          console.error('Fetch user error:', error);
          navigate('/signin');
        }
      };
  
      checkLoginStatus();
    };

    fetchUploadedPapers();
  }, [navigate]);

  const handleLogout = async () => {
    setLoadingLogout(true); // Show the spinner for logout
    try {
      await account.deleteSession('current'); // Deletes the current session
      notifyLogout(); // Show toast and handle redirect on close
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      setLoadingLogout(false); // Hide the spinner for logout
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoadingImageUpload(true); // Show the spinner for image upload
      try {
        // Upload the image to Appwrite storage
        const uploadedFile = await storage.createFile(
          process.env.REACT_APP_BUCKET_ID, // Bucket ID
          'unique()', // Use 'unique()' to generate a unique file ID
          file // The file to upload
        );
  
        // Get the image URL from the storage
        const imageUrl = await storage.getFile(
          process.env.REACT_APP_BUCKET_ID, 
          uploadedFile.$id // Use the file ID returned by the upload
        );
  
        // Update the user's profile with the new image URL
        await account.updatePrefs({
          profile_image: imageUrl,
        });
  
        // Update the profile image in the state
        setProfileImage(imageUrl);
  
        toast.success("Profile image updated successfully!");
      } catch (error) {
        console.error('Image upload error:', error);
        toast.error("Failed to upload profile image.");
      } finally {
        setLoadingImageUpload(false);
      }
    }
  };
  

  return (
    <div className='bg-gray-800'>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        {/* Top Section with Image and Info */}
        <div className="flex items-center justify-between">
          {/* Profile Image */}
          <div className="flex-shrink-0 relative">
            <img
              src={profileImage} // Display the profile image
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300"
            />
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              onChange={handleImageUpload}
              disabled={loadingImageUpload} // Disable during upload
            />
            {loadingImageUpload && (
              <div className="absolute inset-0 flex items-center justify-center">
                <FaSpinner className="animate-spin text-gray-500" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 ml-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold text-gray-700">Name</p>
              <p>{name}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold text-gray-700">Email</p>
              <p>{email}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold text-gray-700">Role</p>
              <p>Student</p> {/* Replace with actual role (Student/Teacher) */}
            </div>
            <div className="bg-white p-4 rounded shadow">
              <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                onClick={handleLogout}
                disabled={loadingLogout} // Disable button while loading logout
              >
                {loadingLogout ? (
                  <FaSpinner className="animate-spin mr-2" /> // Spinner icon with animation
                ) : (
                  'Logout'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section (Uploaded Papers or No Papers Message) */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {papers.length > 0 ? (
            papers.map((paper) => (
              <div key={paper.id} className="bg-white p-4 rounded shadow">
                <p className="font-bold text-gray-700">{paper.title}</p>
                <a href={paper.url} className="text-blue-500 hover:underline">
                  View Paper
                </a>
              </div>
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
