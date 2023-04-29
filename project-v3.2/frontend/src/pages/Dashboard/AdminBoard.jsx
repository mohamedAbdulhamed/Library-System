import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import CardComponent from '../Components/CardComponent';

const AdminBoard=()=>{
  const [usersCount, setUsersCount] = useState(0);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:7000/verify')
    .then(res=> {if (!res.data.loggedIn) {navigate('/login')}})
    .catch(err=> alert("Error occured!"))
    
    axios.get('http://localhost:7000/get-users-count')
    .then(res=> {
      if (res.status === 200) {
        console.log(res.data.count)
        setUsersCount(res.data.count)
      }
    })
    .catch(err=> console.log(err.response.err))
  }, []);
	return(
    <div className='row p-3'>
      <div className="row p-3">
        <CardComponent
          title="Books"
          description="See All Books We Have >"
          linkUrl="/books"
          icon="book"
        />
        <CardComponent
          title="Chapters"
          description="Manage Books Chapters >"
          linkUrl="/chapters"
          icon="chapter"
        />
        <CardComponent
          title={`Users | (${usersCount} Users)`}
          description="Manage Users >"
          linkUrl="/users"
          icon="users"
        />

      </div>
      <div className="row p-3">
        <CardComponent
          title="Requests"
          description="Manage users requests >"
          linkUrl="/requests"
          icon="request"
        />
        <CardComponent
          title="Profile"
          description="Manage your own profile >"
          linkUrl="/profile"
          icon="profile"
        />
      </div>
    </div>
  )}
export default AdminBoard 