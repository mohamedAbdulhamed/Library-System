import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ProfileCard from '../Components/ProfileComponent';
import '../style/profile.css'

const Profile = () => {
  const [user, setUser] = useState({});
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const getUser = () => {
    axios.get('http://localhost:7000/verify')
    .then(res=> {if (res.data.loggedIn) {setUser(res.data.user.user);} else navigate('/login', {msg: "You are not logged in!"})})
    .catch(err=> alert("Error occured!"))
  }
  useEffect(() => {
    getUser();
    if (user.id) {
      axios.get('http://localhost:7000/get-user-requests/'+user.id)
      .then(res=>{
        if (res.data !== "User Has No Requests!") {
          setRequests(res.data);
        }
      })
      .catch(err=>console.log(err))
    }
  }, [user.id]);

  return (
    <div className="profile-container">
      <ProfileCard
        name={user.name}
        email={user.email}
        type={user.type}
        requests={requests}
      />
    </div>
  );
}                              

export default Profile