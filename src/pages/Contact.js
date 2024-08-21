import React from 'react';
// import ravi from './images/ravi';
function Contact() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-orange-500 to-pink-500">
      <div className="bg-white rounded-lg m-4 p-8 shadow-lg">
        <h2 className="text-center text-xl font-bold">Our Team</h2>
        <hr className="w-40 my-4 mx-auto border-gray-300" />
        <div className="flex justify-center flex-wrap">
          <div className="m-2 transition-transform transform hover:scale-110 cursor-pointer">
            <a href="https://www.linkedin.com/in/suraj-kumar-32308020a/" target="_blank" rel="noopener noreferrer">
              <img src="suraj.jpg" alt="Suraj Kumar" className="w-20 h-20 rounded-full mx-auto" />
            </a>
            <h4 className="text-center text-sm font-semibold mt-2">Suraj Kumar</h4>
            <p className="text-center text-xs">Developer</p>
          </div>
          <div className="m-2 transition-transform transform hover:scale-110 cursor-pointer">
            <a href="https://www.linkedin.com/in/himanshu-kumar-158904230/" target="_blank" rel="noopener noreferrer">
              <img src="himshau.jpg" alt="Himanshu Kumar" className="w-20 h-20 rounded-full mx-auto" />
            </a>
            <h4 className="text-center text-sm font-semibold mt-2">Himanshu Kumar</h4>
            <p className="text-center text-xs">Developer</p>
          </div>
          <div className="m-2 transition-transform transform hover:scale-110 cursor-pointer">
            <a href="https://www.linkedin.com/in/ravi-shankar-singh-0171511a5/" target="_blank" rel="noopener noreferrer">
              <img src='' alt="Ravi Shankar Singh" className="w-20 h-20 rounded-full mx-auto" />
            </a>
            <h4 className="text-center text-sm font-semibold mt-2">Ravi Shankar Singh</h4>
            <p className="text-center text-xs">Developer</p>
          </div>
          <div className="m-2 transition-transform transform hover:scale-110 cursor-pointer">
            <a href="https://www.linkedin.com/in/aman-prakash-sharma-802b51230/" target="_blank" rel="noopener noreferrer">
              <img src="aman prakash.jpg" alt="Aman Prakash Sharma" className="w-20 h-20 rounded-full mx-auto" />
            </a>
            <h4 className="text-center text-sm font-semibold mt-2">Aman Prakash Sharma</h4>
            <p className="text-center text-xs">Developer</p>
          </div>
          <div className="m-2 transition-transform transform hover:scale-110 cursor-pointer">
            <a href="https://www.linkedin.com/in/shalap-pandotra-293aa0265/" target="_blank" rel="noopener noreferrer">
              <img src="shalap.jpg" alt="Shalap Pandotra" className="w-20 h-20 rounded-full mx-auto" />
            </a>
            <h4 className="text-center text-sm font-semibold mt-2">Shalap Pandotra</h4>
            <p className="text-center text-xs">Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
