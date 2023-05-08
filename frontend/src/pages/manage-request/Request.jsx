import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../style/request.scss";
import { Link, useNavigate } from "react-router-dom";

const Request = () => {
  // userid, bookid, status
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState({});
  const [userNames, setUserNames] = useState({});
  const [bookNames, setBookNames] = useState({});
  const navigate = useNavigate();
  // ! filter requests by status first pending then accepted,declined !
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:7000/verify")
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user.user);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          navigate("/login");
        } else if (err.response.status === 500) {
          console.log(err.response.data.devErr);
          navigate("/login");
        }
      });
    // Get all requests
    axios
      .get("http://localhost:7000/get-requests/")
      .then((res) => {
        if (res.data === "No Requests Found!") {
          setErr(res.data);
        } else setRequests(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Redirect to dashboard if user is not admin
    if (user.type === 1) {
      navigate("/dashboard");
    }
  }, [user]);

  // Get books and users names
  useEffect(() => {
    axios
      .get("http://localhost:7000/get-users")
      .then((response) => {
        setUserNames(
          response.data.reduce(
            (acc, user) => ({ ...acc, [user.id]: user.name }),
            {}
          )
        );
      })
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:7000/get-books")
      .then((response) => {
        setBookNames(
          response.data.reduce(
            (acc, book) => ({ ...acc, [book.id]: book.name }),
            {}
          )
        );
      })
      .catch((error) => console.log(error));
  }, []);
  function GetUserName(id) {
    return userNames[id] || "";
  }

  function GetBookName(id) {
    return bookNames[id] || "";
  }

  function GetStatus(status) {
    if (status === 0) {
      return "Pending";
    } else if (status === 1) {
      return "Accepted";
    } else if (status === -1) {
      return "Declined";
    }
  }

  function ControlButtons(status, id) {
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
    }
  }
  function UpdateButton(status, id) {
    if (status !== 0) {
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
  function handleAccept(id) {
    axios
      .post("http://localhost:7000/accept-request/" + id)
      .then((res) => {
        if (res.status === 200) {
          setMsgSuccess(res.data.msg);
          window.location.reload();
        } else {
          setErr(res.data.err);
        }
      })
      .catch((err) => console.log(err));
  }
  function handleDecline(id) {
    axios
      .post("http://localhost:7000/reject-request/" + id)
      .then((res) => {
        if (res.status === 200) {
          setMsgSuccess(res.data.msg);
          window.location.reload();
        } else {
          setErr(res.data.err);
        }
      })
      .catch((err) => {
        setErr(err.response.data.err);
      });
  }

  if (isLoading) {
    return <p>Loading...</p>;
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
      <div className="request-container">
        <div className="row req-header">
          <h2 className="req-info">Manage Requests</h2>
          <div className="Btn">
            <Link to="/requests/create" className="btn btn-primary">
              Create +
            </Link>
          </div>
        </div>
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
              {requests.map((request, i) => (
                <tr key={i}>
                  <td>
                    <Link to={"/users"}>{GetUserName(request.user_id)}</Link>
                  </td>
                  <td>
                    <Link to={"/books/book/" + request.book_id}>
                      {GetBookName(request.book_id)}
                    </Link>
                  </td>
                  <td>{GetStatus(request.status)}</td>
                  <td>
                    {ControlButtons(request.status, request.id)}
                    {UpdateButton(request.status, request.id)}
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
