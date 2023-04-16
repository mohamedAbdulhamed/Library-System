import React, { useState ,useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faXmark, faClock} from '@fortawesome/free-solid-svg-icons';
import './UserProfile.css';

// FullName, Email, phone, requests history, and a button to delete the user account.
function Profile() {
  const {id} = useParams();
  const [user, setUser] = useState({});
  // const [requests, setRequests] = useState([]);
  // const [books, setBooks] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:7000/get-user/'+id)
    .then(res=>setUser(res.data[0]))
    .catch(err=>console.log(err))

    // axios.get('http://localhost:7000/get-user-requests/'+id)
    // .then(res=>setRequests(res.data))
    // .catch(err=>console.log(err))

    // axios.get('http://localhost:7000/get-books')
    // .then(res=>setRequests(res.data))
    // .catch(err=>console.log(err))
  },[])

  // function GetBookName(id) {
  //   let book = books.find(book => book.id === id);
  //   return book.name;
  // }

  // function GetIcon(status) {
  //   if (status === 1) {
  //     // Accepted
  //     return faCheck;
  //   } else if (status === -1) {
  //     // Declined
  //     return faXmark;
  //   }
  //   // Pending
  //   return faClock;
  // }


  return (
    <div className='wrapper'>
      <header>
        <h1>Profile</h1>
        <button className='delete-button' >Delete Profile</button> {/* onClick={DeleteProfile(id)} */}
      </header>
      {/* I am adding 'my' to the class name so it won't be overriden */}
      <div className="cards-area">
        <div className="my-card">
          <div className="my-row">
            {/* User Details */}
            <div className="user-details">
              <h2>Full Name</h2>
              <p>{user.name}</p>
            </div>
            {/* Requests History */}
            <ul className="features">
              {/* {requests.map((request,i)=>(
                // <li><FontAwesomeIcon icon={GetIcon(request.status)}/><span>{GetBookName(request.book_id)}</span></li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
  function DeleteProfile(id) {
    axios.delete('http://localhost:7000/delete-user/'+id)
    .then(res=>{
      alert(res.data);
      window.location.href = '/Login';
    })
    .catch(err=>console.log(err))
  }
}
export default Profile;