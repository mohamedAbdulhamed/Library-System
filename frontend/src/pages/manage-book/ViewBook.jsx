import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/ViewBook.scss";

const Viewbook = () => {
  const [book, setBook] = useState({});
  const [bookChapters, setBookChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [bookStatus, setBookStatus] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));

    setTimeout(() => {
      setBook({
        id: 1,
        name: "The Catcher in the Rye",
        author: "J.D. Salinger",
        description: "A classic novel about teenage angst.",
        field: "Fiction",
        dop: "2023-01-15",
      });

      setBookChapters([
        { id: 1, title: "Chapter 1", description: "Introduction" },
        { id: 2, title: "Chapter 2", description: "Conflict" },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const handleRequest = () => {
    setBookStatus(true);
    setMsg("Book requested successfully!");
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="book-card" style={{ marginTop: 70, marginBottom: 70}}>
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
              {book.dop ? book.dop.substr(0, 10) : "Unknown"}
            </div>
          </div>
          <table className="chapters-container">
            <thead>
              <tr>
                <th>Chapter Title</th>
                <th>Description</th>
              </tr>
            </thead>
            {bookChapters.length > 0 && (
              <tbody>
                {bookChapters.map((chapter) => (
                  <tr key={chapter.id} className="chapter">
                    <td>{chapter.title}</td>
                    <td>{chapter.description}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {user.role === "user" && (
            <div className="book-actions p-3">
              <button
                className="btn btn-primary"
                onClick={handleRequest}
                disabled={bookStatus}
              >
                {bookStatus ? "Requested" : "Request This Book"}
              </button>
            </div>
          )}
        </div>
      </div>
      {msg && <div className="msg success w-100">{msg}</div>}
    </div>
  );
}

export default Viewbook;
