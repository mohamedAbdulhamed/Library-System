import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminBoard from "./AdminBoard";
import UserBoard from "./UserBoard";

function Dashboard () {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({type: 0});
  const [loading, setLoading] = React.useState(true);
  
  axios.defaults.withCredentials = true;
  useEffect(() => {
    async function verify() {
      await axios.get('http://localhost:7000/verify')
      .then(res=> {if (res.data.loggedIn) {setUser(res.data.user.user); setLoading(false) } else navigate('/login', {msg: "You are not logged in!"})})
      .catch(err=> alert("Error occured!"))
    }
    verify();
	}, []);

  function ControlContent() {
    if (user.type === 0) {
      return <AdminBoard/>;
    } else {
      return <UserBoard/>;
    }
  }

  return(
    <>
      {loading ? <div>Loading...</div> : <ControlContent />}
    </>
  )
}

export default Dashboard;