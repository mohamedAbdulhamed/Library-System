import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "../style/ViewBook.scss";

function Viewbook() {
  const navigate = useNavigate();
  const { id } = useParams(); // book id
  const [user, setUser] = useState({});
  const [book, setBook] = useState({});
  const [bookStatus, setBookStatus] = useState(1); // [requested => 1, notRequested => 0]
  const [bookChapters, setBookChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // Check uf user is logged in
    axios.defaults.withCredentials = true;
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

    axios
      .get("http://localhost:7000/get-book/" + id)
      .then((res) => {
        if (res.status === 200) {
          setBook(res.data[0]);
        }
      })
      .catch((err) => {
        console.log(err.response.data.devErr);
        setErr(err.response.data.err);
      });

    axios
      .get("http://localhost:7000/get-chapters-by-book/" + id)
      .then((res) => {
        if (res.status === 200) {
          setBookChapters(res.data);
        }
      })
      .catch((err) => {
        console.log(err.response.data.devErr);
        setErr(err.response.data.err);
      });
  }, []);
  useEffect(() => {
    // Check if book is already requested
    axios
      .get("http://localhost:7000/requested-books/" + user.id)
      .then((res) => {
        if (res.status === 200) {
          // User have requested books
          const requestedBooks = res.data;
          const requestedBook = requestedBooks.find(
            (book) => book.book_id === id
          );
          if (requestedBook) {
            setBookStatus(1);
          } else {
            setBookStatus(0);
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          console.log(err.response.data.devErr);
          setErr(err.response.data.err);
          setBookStatus(0);
        } else if (err.response.status === 404) {
          // User have no requested books
          setBookStatus(0);
        }
      });
  }, [id, user.id]);

  const handleRequest = () => {
    // Make a request to the backend to request the book
    axios
      .post("http://localhost:7000/create-request", {
        book_id: id,
        user_id: user.id,
      })
      .then((res) => {
        setMsg(res.data.msg);
        setBookStatus(1);
      })
      .catch((err) => {
        setErr(err.response.data.err);
        setBookStatus(0);
      });
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="book-card">
      <div className="header">
        <h1>Book Details</h1>
      </div>
      <Link to="/books" className="btn btn-primary">
        Back
      </Link>
      <div className="book-details">
        <div className="book-info">
          <h1>{book.name}</h1>
          <h2>{book.author}</h2>
          <p>{book.description}</p>
          <div className="book-meta">
            <div className="meta-item">
              <span>Genres:</span> {book.field}
            </div>
            <div className="meta-item">
              <span>First published:</span>{" "}
              {book.dop ? book.dop.substr(0, 10) : ""}
            </div>
          </div>
          <table className="chapters-container">
            <thead>
              <tr>
                <th>Chapter Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {bookChapters.map((chapter) => (
                <tr className="chapter">
                  <td>{chapter.title}</td>
                  <td>{chapter.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        <div className="book-actions p-3">
          <button
            className="btn btn-primary"
            onClick={handleRequest}
            disabled={bookStatus}
          >
            {bookStatus ? "Requested" : "Request This Book"}
          </button>
        </div>
        </div>
      </div>
      {msg && <div className="msg success w-100">{msg}</div>}
      {err && <div className="msg error">{err}</div>}
    </div>
  );
}

export default Viewbook;
