import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "./Request.css";
import "../style/updateRequest.scss";
const UpdateRequest = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [request, setRequest] = useState({});
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:7000/get-request/' + id),
      axios.get('http://localhost:7000/get-books/'),
      axios.get('http://localhost:7000/get-users/')
    ]).then((res) => {
      if (res[0].status === 200) setRequest(res[0].data[0]);
      if (res[1].status === 200) setBooks(res[1].data);
      if (res[2].status === 200) setUsers(res[2].data);
    }).catch((err) => {
      console.log(err.response.status + ' ' + err.response.data.devErr);
      alert(err.response.data.err);
    });
  }, [id]);

  function GetBookName(id) {
    let book = books.find((book) => book.id === id);
    return book ? book.name : "";
  }
  function GetUserName(id) {
    let user = users.find((user) => user.id === id);
    return user ? user.name : "";
  }
  function GetStatus(status) {
    if (status === 1)
      return (
        <span className="text-success">
          Accepted <FontAwesomeIcon icon={faCheck} />
        </span>
      );
    return (
      <span className="text-danger">
        Declined <FontAwesomeIcon icon={faX} />
      </span>
    );
  }
  function ActionButton(status, id) {
    if (status === -1) {
      return (
        <button
          className="text-decoration-none btn btn-sm btn-primary"
          onClick={(e) => handleAccept(id)}
        >
          Accept
        </button>
      );
    }
    if (status === 1) {
      return (
        <button
          className="text-decoration-none btn btn-sm btn-danger"
          onClick={(e) => handleDecline(id)}
        >
          Decline
        </button>
      );
    }
  }
  function handleAccept(id) {
    axios
      .post("http://localhost:7000/accept-request/" + id)
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }
  function handleDecline(id) {
    axios
      .post("http://localhost:7000/reject-request/" + id)
      .then((res) => {
        alert(res.data.msg);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }
  console.log(request);
  if (!request.id || !books.length || !users.length) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </button>
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
          <tr>
            {/* Make the name a link to the user profile */}
            <td>{GetUserName(request.user_id)}</td>
            <td>{GetBookName(request.book_id)}</td>
            <td>{GetStatus(request.status)}</td>
            <td>{ActionButton(request.status, request.id)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UpdateRequest;
