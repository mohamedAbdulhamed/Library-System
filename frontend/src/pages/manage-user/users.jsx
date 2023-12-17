import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import '../style/users.scss';

function Users() {
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      status: true,
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "987-654-3210",
      status: false,
    },
    {
      id: 3,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "555-555-5555",
      status: true,
    },
    {
      id: 4,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "555-555-5555",
      status: true,
    },
    {
      id: 5,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "555-555-5555",
      status: true,
    },
    {
      id: 6,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "555-555-5555",
      status: true,
    },
    {
      id: 7,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "555-555-5555",
      status: true,
    },
  ]);
  const [hoveredUserId, setHoveredUserId] = useState(null);

  // Functions to handle hover effect
  function handleMouseEnter(userId) {
    setHoveredUserId(userId);
  }

  function handleMouseLeave() {
    setHoveredUserId(null);
  }

  useEffect(() => {
    // Extract user ID from the URL hash
    const userIdFromHash = parseInt(window.location.hash.slice(1), 10);

    // Scroll to the user with the specified ID
    if (!isNaN(userIdFromHash)) {
      const userElement = document.getElementById(`user-${userIdFromHash}`);
      if (userElement) {
        userElement.scrollIntoView({ behavior: "smooth" });
      }
    }
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
      <div className="users">
        <div className="container">
          <h2 className="main-title">Users</h2>
          <div className="table table-striped">
            
            <Table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status (Active, In-active)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                    <tr
                      key={user.id}
                      id={`user-${user.id}`}
                      // Set temporary hover effect on mouse enter
                      onMouseEnter={() => handleMouseEnter(user.id)}
                      // Remove temporary hover effect on mouse leave
                      onMouseLeave={() => handleMouseLeave()}
                      style={{
                        backgroundColor:
                          user.id === hoveredUserId ? "lightblue" : "inherit",
                        transition: "background-color 1s",
                      }}
                    >
                    
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    {user.phone ? <td>{user.phone}</td> : <td>Not Available</td>}
                    <td>
                      {user.status ? (
                        <div className="d-flex">
                          <p style={{ marginRight: "5px" }}>Active</p>
                          <FontAwesomeIcon
                            className="mt-1"
                            icon={faCheckCircle}
                            color="green"
                          />
                        </div>
                      ) : (
                        <div className="d-flex">
                          <p style={{ marginRight: "5px" }}>In-active</p>
                          <FontAwesomeIcon
                            className="mt-1"
                            icon={faTimesCircle}
                            color="red"
                          />
                        </div>
                      )}
                    </td>
                    <td className="td">
                      <Link
                        to={`/users/update/${user.id}`}
                        className="btn btn-primary button"
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger button delete-btn"
                        onClick={() => handleDelete(user.id)}
                      >
                        <span></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure to delete this user?");
    if (confirm) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    }
  }
}

export default Users;
