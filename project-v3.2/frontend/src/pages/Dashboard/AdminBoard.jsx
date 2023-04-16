import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const AdminBoard=()=>{
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    async function verify() {
      await axios.get('http://localhost:7000/verify')
      .then(res=> {if (res.data.loggedIn) {setUser(res.data.user.user); setLoading(false) } else navigate('/login', {msg: "You are not logged in!"})})
      .catch(err=> alert("Error occured!"))
    }
    verify();
  }, []);
	return(
    <div className="container">
      <h1>Admin</h1>
      <h2></h2>
    </div>
  )}
export default AdminBoard 