import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../style/updateRequest.scss";

const UpdateRequest = () => {
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    id: 1,
    user_id: 1,
    book_id: 1,
    status: -1,
  }); 
  const [books, ] = useState([
    {
      id: 1,
      name: "Sample Book",
    },
  ]); 
  const [users, ] = useState([
    {
      id: 1,
      name: "Sample User",
    },
  ]);


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
    else if (status === -1)
      return (
        <span className="text-danger">
          Declined <FontAwesomeIcon icon={faTimes} />
        </span>
      );
    else
      return (
        <span className="text-warning">
          Pending <FontAwesomeIcon icon={faTimes} />
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
    } else if (status === 1) {
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
    setRequest({ ...request, status: 1 });
  }

  function handleDecline(id) {
    setRequest({ ...request, status: -1 });
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
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
