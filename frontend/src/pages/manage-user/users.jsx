import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "./users.css";
import "../style/BookList.scss";
import { useNavigate } from "react-router-dom";
import { Table } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";
function Users() {
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:7000/get-users")
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response.devErr).setErr(err.response.err);
      });
  }, []);

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
      <div >
        <div className="header">
          <h1>users</h1>
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>
        </div>
        
        <div className="add table_create_btn">
            <Link to="/users/create" className="btn btn-primary my-3 button">
              New User
            </Link>
        </div>
        <div className="table-container">
          <Table >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status (Active, In-active)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {user.phone ? <td>{user.phone}</td> : <td>Not Available</td>}
                  <td>
                    {user.status ? (
                      <div className="d-flex">
                        <p style={{ marginRight: '5px' }}>Active</p>
                        <FontAwesomeIcon className="mt-1" icon={faCheckCircle} color="green" />
                      </div>
                    ) : (
                      <div className="d-flex">
                        <p style={{ marginRight: '5px' }}>In-active</p>
                        <FontAwesomeIcon className="mt-1" icon={faTimesCircle} color="red" />
                      </div>
                    )}
                  </td>
                  <td className="td">
                    <div className="buttonsList">
                      <Link
                        className="myButton"
                        to={`/users/update/${user.id}`}
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger button"
                        onClick={(e) => handelDelete(user.id)}
                      >
                        <span></span>
                      </button>
                    </div>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );

  function handelDelete(id) {
    const confirm = window.confirm("Are you sure to delete this user?");
    if (confirm) {
      axios
        .delete("http://localhost:7000/delete-user/" + id)
        .then((res) => {
          alert(res.data.msg);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  }
}

export default Users;
