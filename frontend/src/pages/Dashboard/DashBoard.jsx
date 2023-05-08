import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminBoard from "./AdminBoard";
import UserBoard from "./UserBoard";

import "../style/dash.css";

function Dashboard () {
  const [content, setContent] = useState(null);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:7000/verify')
    .then(res=> {
      if (res.status === 200) {
        if (res.data.loggedIn) {
          if (res.data.user.user.type === 0) {
            setContent(<AdminBoard/>);
          }else{
            setContent(<UserBoard/>);
          }
        }
      }
    })
    .catch(err=> {
      if (err.response.status === 404) {
        console.log(err.response.data.msg)
        navigate('/login')
      } else if (err.response.status === 500) {
        console.log(err.response.data.devErr)
        setErr(err.response.data.err)
      }
    })
  }, []);

  return(
    <>
      {content}
    </>
  )
}

export default Dashboard;