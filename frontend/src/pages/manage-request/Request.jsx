import React, { useState, useEffect } from "react";
import "../style/request.scss";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";

const Request = () => {
  const [requests, ] = useState([
    {
      id: 1,
      user_id: 1,
      book_id: 1,
      status: 0, // 0 for pending, 1 for accepted, -1 for declined
    },
    {
      id: 2,
      user_id: 2,
      book_id: 2,
      status: 1, // 0 for pending, 1 for accepted, -1 for declined
    },
    {
      id: 3,
      user_id: 5,
      book_id: 34,
      status: -1, // 0 for pending, 1 for accepted, -1 for declined
    },
  ]);

  const [userNames, ] = useState({
    1: "User 1",
    2: "User 2",
    5: "User 3",
  });

  const [bookNames, ] = useState({
    1: "Book 1",
    2: "Book 2",
    34: "Book 3",
  });

  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      // 
      setIsLoading(false);
    }, 1000);
  }, []);

  const getUserName = (id) => {
    return userNames[id] || "";
  }

  const getBookName = (id) => {
    return bookNames[id] || "";
  }

  const isUserBanned = (id) => {
    const bannedUsers = [1, 2, 3];
    return bannedUsers.includes(id);
  }

  const bookExists = (id) => {
    const bookIds = [1, 2, 3];
    return bookIds.includes(id);
  }

  const getStatus = (status) => {
    if (status === 0) {
      return "Pending";
    } else if (status === 1) {
      return "Accepted";
    } else if (status === -1) {
      return "Declined";
    }
  }

  const displayButtons = (status, id) => {
    if (status === 0) {
      return (
        <>
          <button
            className="text-decoration-none btn btn-sm btn-primary m-2"
            onClick={(e) => handleAccept(id)}
          >
            Accept
          </button>
          <button
            className="text-decoration-none btn btn-sm btn-danger m-2"
            onClick={(e) => handleDecline(id)}
          >
            Decline
          </button>
        </>
      );
    }else {
      return (
        <Link
          className="text-decoration-none btn btn-sm btn-success"
          to={`/requests/update/${id}`}
        >
          Update
        </Link>
      );
    }
  }

  const handleAcceptDecline = (id, action) => {
    if (isUserBanned(id)) {
      setErr(`User ${id} is banned!`);
      return;
    }
    if (!bookExists(id)) {
      setErr(`Book ${id} does not exist!`);
      return;
    }

    if (action === 'accept') {
      setMsgSuccess(`Request ${id} accepted successfully!`);
    } else if (action === 'decline') {
      setMsgSuccess(`Request ${id} declined successfully!`);
    } else {
      setErr(`Invalid action ${action}!`);
      return;
    }
  }

  const handleAccept = (id) => {
    handleAcceptDecline(id, 'accept');
  }
  
  const handleDecline = (id) => {
    handleAcceptDecline(id, 'decline');
  }

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <>
      {err && (
        <div className="error fixed-top">
          <span>{err}</span>
          <button className="close-btn" onClick={() => setErr("")}>
            X
          </button>
        </div>
      )}
      {msg && (
        <div className="msg fixed-top">
          <span>{msg}</span>
          <button className="close-btn" onClick={() => setMsg("")}>
            X
          </button>
        </div>
      )}
      {msgSuccess && (
        <div className="msg-success fixed-top">
          <span>{msgSuccess}</span>
          <button className="close-btn" onClick={() => setMsgSuccess("")}>
            X
          </button>
        </div>
      )}

      <div className="container">
        <h2 className="main-title">Manage Requests</h2>
        
        {requests && requests.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Book</th>
                <th>Status</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {requests?.map((request, i) => (
                <tr key={i}>
                  <td>
                    <Link to={"/users#" + request.user_id}>{getUserName(request.user_id)}</Link>
                  </td>
                  <td>
                    <Link to={"/books/book/" + request.book_id}>
                      {getBookName(request.book_id)}
                    </Link>
                  </td>
                  <td>{getStatus(request.status)}</td>
                  <td>
                    {displayButtons(request.status, request.id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Requests Found!</p>
        )}
      </div>
    </>
  );
};

export default Request;
