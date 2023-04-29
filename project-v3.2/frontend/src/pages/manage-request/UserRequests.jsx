import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faSpinner  } from '@fortawesome/free-solid-svg-icons'
import '../style/userreqs.css'


const UserRequests=()=>{
  const [requests, setRequests] = useState([]);
  const [bookNames, setBookNames] = useState({});
  const [loading, setIsLoading] = useState(true);
  const [downloading, setDownloading] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:7000/verify')
    .then(res=> {
      if (res.status === 200) {
        setIsLoading(false)
      }
    })
    .catch(err=> {
      if (err.response.status === 404) {
        navigate('/login')
      } else if (err.response.status === 500) {
        console.log(err.response.data.devErr)
      }
    })
    axios.get('http://localhost:7000/get-requests')
    .then(res => {setRequests(res.data); setIsLoading(false);})
    .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    const promises = requests.map(request => {
      return axios.get('http://localhost:7000/get-book/' + request.book_id)
        .then(res => {
          setBookNames(prevState => ({
            ...prevState,
            [request.book_id]: res.data[0].name
          }));
        })
        .catch(err => console.log(err));
    });

    Promise.all(promises)
      .catch(err => console.log(err));
  }, [requests]);
  function getBookName(book_id) {
    axios.get('http://localhost:7000/get-book/'+book_id)
    .then(res => {return res.data.name})
    .catch(err => console.log(err));
  }
  function handleDownload(book_id) {
    setDownloading(prevState => [...prevState, book_id]);
    axios.get('http://localhost:7000/download-book/' + book_id, { responseType: 'blob' })
      .then(res => {
        setDownloading(prevState => prevState.filter(id => id !== book_id));
        // create a Blob object from the file data
        const fileBlob = new Blob([res.data], { type: res.data.type });
        // create a URL for the Blob object
        const fileUrl = URL.createObjectURL(fileBlob);
        // create a link element and simulate a click to trigger the file download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = res.headers['content-disposition']?.split('filename=')[1];
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(err => console.log(err.response.data.err));
  }
  function handleGoBack() {
    navigate(-1);
  }
  if (loading) {
    return <h1>Loading...</h1>
  }
	return(
    <>
    <div className="request-card p-3">
      <div className="request-card-header"> 
        <h3>Accepted Requests</h3>
        <button className='back-button' onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Go Back
        </button>
      </div> 
      <div className="request-card-body"> 
        {/* Requests History */}
        <table className="request-table mt-3">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, i) => {
                if (request.status === 1) {
                  const isDownloading = downloading.includes(request.book_id);
                  return (
                    <tr key={i}>
                      <td className="book-name">{bookNames[request.book_id] ? bookNames[request.book_id].substring(0, 30) : "Loading Book Name..."}</td>
                      <td>
                        <span className="download-button" onClick={() => handleDownload(request.book_id)}>
                          {isDownloading ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                          ) : (
                            "Download"
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
    </div> 
    </>
  )
}
export default UserRequests 