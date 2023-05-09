import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import CardComponent from '../Components/CardComponent';


const UserBoard=()=>{
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:7000/verify')
    .then(res=> {if (res.data.loggedIn) {setUser(res.data.user.user)} else navigate('/login', {msg: "You are not logged in!"})})
    .catch(err=> alert("Error occured!"))
  }, []);

	return(
    <>
      <div className="row p-3 justify-content-center cards-container">
        <CardComponent
          title="Books"
          description="See All Books We Have >"
          linkUrl="/books"
          icon="book"
        />
        <CardComponent
          title="Accepted Book Requests"
          description="Download Requested Books >"
          linkUrl="/user_requests"
          icon="request"
        />
        <CardComponent
          title="Profile"
          description="Manage your own profile >"
          linkUrl="/profile"
          icon="profile"
        />
      </div>
    </>
  )
}
export default UserBoard 