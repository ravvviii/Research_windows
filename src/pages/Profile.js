import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon from react-icons
import { useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account } from '../appwrite/config';

function Profile() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  
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
            setemail(user.email || '');
            setname(user.name || '');
            
          } else {
            navigate('/login');
          }
        } catch (error) {
          console.error('Fetch user error:', error);
          navigate('/login');
        } finally {
          setLoading(false);
        }
      };
  
      checkLoginStatus();

    };

    fetchUploadedPapers();
  }, [navigate]);

  const handleLogout = async () => {
    setLoading(true); // Show the spinner
    try {
      await account.deleteSession('current'); // Deletes the current session
      notifyLogout(); // Show toast and handle redirect on close
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      setLoading(false); // Hide the spinner
    }
  };

  return (
    <div className='bg-gray-800'>
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        {/* Top Section with Image and Info */}
        <div className="flex items-center justify-between">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              src="https://via.placeholder.com/150" // Replace with actual profile image URL
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-300"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 ml-6 grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold text-gray-700">UID</p>
              <p>{name}</p> {/* Replace with actual UID */}
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold text-gray-700">Department</p>
              <p>{email}</p> {/* Replace with actual department */}
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="font-bold text-gray-700">Role</p>
              <p>Student</p> {/* Replace with actual role (Student/Teacher) */}
            </div>
            <div className="bg-white p-4 rounded shadow">
              <button 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                onClick={handleLogout}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
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
