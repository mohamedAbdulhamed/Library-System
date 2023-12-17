import React from "react";
import { useState, useEffect } from "react";

import AdminBoard from "./AdminBoard";
import UserBoard from "./UserBoard";

import "../style/Dashboard.css";

function Dashboard () {
  const [content, setContent] = useState(null);
  const [isDebugVisible, setDebugVisible] = useState(false);
  const [user, setUser] = useState({});

  console.log('Press Ctrl+` to show debugging section');

  const changeRole = () => {
    // debugging function
    const user = JSON.parse(localStorage.getItem("user"));
    user.role = user.role === "admin" ? "user" : "admin";
    localStorage.setItem("user", JSON.stringify(user));

    window.location.reload();
  }

  document.addEventListener('keydown', function (event) {
    // Check if Ctrl key is pressed and the key is backtick
    if (event.ctrlKey && event.key === '`') {
      showDebug();
    }
  });
  

  const showDebug = () => {
    console.log('ctrl+` pressed, showing debug section');
    setDebugVisible((prev) => !prev);
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    user.role === "admin" ? setContent(<AdminBoard />) : setContent(<UserBoard />);
  }, [user.role]);

  return(
    <>
      {content}

      {/* Debugging Section */}
      <div className={`debug-section ${isDebugVisible ? 'show' : ''}`}>
        <div className="row p-3 d-flex justify-content-center">
          <h3 className="row p-3 d-flex justify-content-center">Debugging Section</h3>
          <p className="row p-3 d-flex justify-content-center">Current role: {user.role}</p>
          <button className="btn btn-primary w-50" onClick={changeRole}>
            Change Role
          </button>
        </div>
      </div>
      {/* End/ Debugging Section */}

    </>
  )
}

export default Dashboard;