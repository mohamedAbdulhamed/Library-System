import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../style/userreqs.css';

// Accepted Book Requests

const UserRequests = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  
  const requests = [
    {
      book_id: 1,
      status: 1,
    },
  ];

  const bookNames = {
    1: 'Sample Book', 
  };

  const handleDownload = (book_id) => {
    setIsDownloading(true);
    console.log(`Downloading book with ID ${book_id}...`);
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <div className="container">
        <h2 className='main-title'>Accepted Requests</h2>
        <button className="back-button" onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Go Back
        </button>

        <table className="request-table table">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, i) => {
              if (request.status === 1) {
               
                return (
                  <tr key={i}>
                    <td className="book-name">
                      {bookNames[request.book_id]
                        ? bookNames[request.book_id].substring(0, 30)
                        : 'Loading Book Name...'}
                    </td>
                    <td>
                      <span
                        className="download-button"
                        onClick={() => handleDownload(request.book_id)}
                      >
                        {isDownloading ? (
                          <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                          'Download'
                        )}
                      </span>
                    </td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserRequests;
