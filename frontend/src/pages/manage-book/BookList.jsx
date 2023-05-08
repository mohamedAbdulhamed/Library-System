import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "./BookList.css";
import "../style/BookList.scss";
import { useNavigate } from "react-router-dom";
import { Table } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";

function Booklist() {
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  // Books requested by user
  const [requestedBooks, setRequestedBooks] = useState([]);
  // Search query
  const [searchQuery, setSearchQuery] = useState("");
  // Selected field
  const [selectedField, setSelectedField] = useState("");
  // Filtered books
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
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
          setErr(err.response.data.err);
          navigate("/login");
        }
      });

    axios
      .get("http://localhost:7000/get-books")
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        } else {
          alert("Error occurred!");
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setErr(err.response.data.err);
        } else {
          setErr("Error occurred!");
        }
      });
  }, []);
  useEffect(() => {
    if (user.id) {
      axios
        .get("http://localhost:7000/requested-books/" + user.id)
        .then((res) => {
          if (res.status === 200) {
            setRequestedBooks(res.data);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  // Search and filter books
  useEffect(() => {
    let filtered = data;
    if (searchQuery || selectedField) {
      filtered = filtered.filter((d) => {
        const nameMatch = d.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const fields = d.field.split(",");
        const fieldMatch = !selectedField || fields.includes(selectedField);
        return nameMatch && fieldMatch;
      });
    }
    setFilteredData(filtered);
  }, [searchQuery, selectedField, data]);

  function RequestBook(id) {
    axios
      .post("http://localhost:7000/create-request", {
        user_id: user.id,
        book_id: id,
      })
      .then((res) => {
        if (res.status === 200) {
          setMsgSuccess(res.data.msg);
          setRequestedBooks((prevData) => [...prevData, res.data.request]); // Add new request to the list
          setInterval(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err.response.data.devErr);
        setErr(err.response.data.err);
      });
  }
  function handleDelete(id) {
    const confirm = window.confirm("Are you sure to delete this book?");
    if (confirm) {
      axios
        .delete("http://localhost:7000/delete-book/" + id)
        .then((res) => {
          setMsg("Book deleted successfully!");
          setData((prevData) => prevData.filter((book) => book.id !== id));
        })
        .catch((err) => console.log(err));
    }
  }
  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <div>Loading...</div>
      </div>
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
        <div className="msg-success fixed-top w-100">
          <span>{msgSuccess}</span>
          <button className="close-btn" onClick={() => setMsgSuccess("")}>
            X
          </button>
        </div>
      )}
      <div>
        <div className="header">
          <h1>Books List</h1>
          {user.type === 0 && (
            <button
              className="create-btn"
              onClick={() => navigate("/books/create")}
            >
              Create Book
            </button>
          )}

          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search books by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-button" onClick={() => setSearchQuery("")}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
          >
            <option value="">All Fields</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="biography">Biography</option>
            <option value="history">History</option>
            <option value="self-help">Self-Help</option>
            <option value="historical-fiction">Historical Fiction</option>
            <option value="classics">Classics</option>
            <option value="romance">Romance</option>
            <option value="carfts-hobbies">Crafts & Hobbies</option>
          </select>
        </div>
        <div className="table-container">
          <Table>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Description</th>
                <th>Author</th>
                <th>Field</th>
                <th>DOP</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((d, i) => (
                <tr key={i}>
                  <td>{d.name}</td>
                  {d.description.length > 50 ? (
                    <td>{d.description.slice(0, 50) + "..."}</td>
                  ) : (
                    <td>{d.description}</td>
                  )}
                  <td>{d.author}</td>
                  <td>{d.field}</td>
                  <td>{d.dop.slice(0, 10)}</td>
                  <td className="td">
                    <div className="buttonsList">
                      {user.type === undefined ? (
                        <p>Loading...</p>
                      ) : user.type === 0 ? (
                        <>
                          <Link
                            className="myButton"
                            to={`/books/update/${d.id}`}
                          >
                            Update
                          </Link>
                          <button
                            className="btn btn-danger button"
                            onClick={(e) => handleDelete(d.id)}
                          >
                            <span></span>
                          </button>
                          <Link className="myButton" to={`/books/book/${d.id}`}>
                            View
                          </Link>
                        </>
                      ) : requestedBooks.some((b) => b && b.id === d.id) ? (
                        <>
                          <button disabled>Requested</button>
                          <Link to={"/books/book/" + d.id}>
                            <button>Details</button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <button onClick={() => RequestBook(d.id)}>
                            Request
                          </button>
                          <Link to={"/books/book/" + d.id}>
                            <button>Details</button>
                          </Link>
                        </>
                      )}
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
}

export default Booklist;
