import React from 'react';
import bhavya from '../images/bhavya.jpeg';
import ishika from '../images/ishika.jpeg';
import ravi from '../images/ravi.png';
import tanmay from '../images/tanmay.jpeg';
function Contact() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-orange-500 to-pink-500">
      <div className="bg-white rounded-lg m-4 p-8 shadow-lg">
        <h2 className="text-center text-xl font-bold">Our Team</h2>
        <hr className="w-40 my-4 mx-auto border-gray-300" />
        <div className="flex justify-center flex-wrap">
          {/* <div className="m-2 transition-transform transform hover:scale-110 cursor-pointer">
            <a href="https://www.linkedin.com/in/aman-prakash-sharma-802b51230//" target="_blank" rel="noopener noreferrer">
              <img src="suraj.jpg" alt="Aman Prakash Sharma" className="w-20 h-20 rounded-full mx-auto" />
            </a>
            <h4 className="text-center text-sm font-semibold mt-2">Aman Prakash Sharma</h4>
            <p className="text-center text-xs">Developer</p>
          </div> */}
          <div className="m-2 transition-transform transform hover:scale-110 cursor-pointer">
            <a href="https://www.linkedin.com/in/bhavya-singh18/" target="_blank" rel="noopener noreferrer">
              <img src={bhavya} alt="Bhavya Singh" className="w-20 h-20 rounded-full mx-auto" />
            </a>
            <h4 className="text-center text-sm font-semibold mt-2">Bhavya Singh</h4>
            <p className="text-center text-xs">Developer</p>
          </div>
          <div className="m-2 transition-transform transform hover:scale-110 cursor-pointer">
            <a href="https://www.linkedin.com/in/ishikagarg421" target="_blank" rel="noopener noreferrer">
              <img src={ishika} alt="Ishika Garg" className="w-20 h-20 rounded-full mx-auto" />
            </a>
            <h4 className="text-center text-sm font-semibold mt-2">Ishika Garg</h4>
            <p className="text-center text-xs">Developer</p>
          </div>
          <div className="m-2 transition-transform transform hover:scale-110 cursor-pointer">
            <a href="https://www.linkedin.com/in/ravi-shankar-singh-ravvviii/" target="_blank" rel="noopener noreferrer">
              <img src={ravi} alt="Ravi Shankar Singh" className="w-20 h-20 rounded-full mx-auto" />
            </a>
            <h4 className="text-center text-sm font-semibold mt-2">Ravi Shankar Singh</h4>
            <p className="text-center text-xs">Developer</p>
          </div>
          <div className="m-2 transition-transform transform hover:scale-110 cursor-pointer">
            <a href="https://www.linkedin.com/in/tanmay-kumar-jha-0b179322a/" target="_blank" rel="noopener noreferrer">
              <img src={tanmay} alt="Tanmay Kumar Jha" className="w-20 h-20 rounded-full mx-auto" />
            </a>
            <h4 className="text-center text-sm font-semibold mt-2">Tanmay Kumar Jha</h4>
            <p className="text-center text-xs">Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
