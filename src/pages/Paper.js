import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon
import { database } from '../appwrite/config'; // Import Appwrite database
import PaperCard from './PaperCard'; // Import PaperCard component

function Paper() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await database.listDocuments(
          process.env.REACT_APP_DB_ID, // Your Database ID
          process.env.REACT_APP_COLLECTION_ID // Your Collection ID
        );
  
        // console.log("Fetched documents:", response.documents); // Log fetched data
  
        const fetchedPapers = response.documents.map(doc => ({
          id: doc.$id,
          name: doc.paper_name,
          fileId: doc.file_id // Make sure this matches the field in your database
        }));
  
        setPapers(fetchedPapers);
      } catch (error) {
        console.error("Failed to fetch papers:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };
  
    fetchPapers();
  }, []);
  
  return (
    <div className="p-4">
      {loading ? (
        // Display the spinner while loading
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-blue-500 text-4xl" />
        </div>
      ) : papers.length === 0 ? (
        // Display message if no papers are found
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-xl">No papers found</p>
        </div>
      ) : (
        // Display papers
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <PaperCard 
              key={paper.id} 
              paperName={paper.name} 
              fileId={paper.fileId} // Pass the correct fileId here
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Paper;
