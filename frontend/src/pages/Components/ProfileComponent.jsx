import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "./profile.css";
import "../style/BookSearches.scss";

const ProfileCard = (props) => {
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [bookSearches, setBookSearches] = useState([]);

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem("savedSearches"));
    if (searches)
    {
      setBookSearches(searches[0]);
    }
  }, []);


  const getStatusIcon = (status) => {
    if (status === 1) {
      return <FontAwesomeIcon icon={faCheck} style={{color:"#20b61c"}} />;
    } else if (status === -1) {
      return <FontAwesomeIcon icon={faXmark} style={{color:"#f00"}} />;
    } else {
      return <FontAwesomeIcon icon={faClock} style={{color:"#11143d"}}  />;
    }
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

      <div className="profile-card p-3 container">
        <div className="profile-card-header">
          <h2 className="main-title">Profile Info</h2>
        </div>
        <div className="profile-card-body">
          <h5>FullName: {props.name}</h5>
          <h5>Email: {props.email}</h5>

          <hr />

          {/* Requests History */}
          {props.type === "user" && props.requests && props.requests.length > 0 ? (
            <>
              <h2 className="main-title">Requests History</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Book</th>
                  </tr>
                </thead>
                <tbody>
                  {props.requests.map((request, i) => (
                    <tr key={i}>
                      <td>{getStatusIcon(request.status)}</td>
                      <td>Book{Math.floor(Math.random() * 10) + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr />

              {/* Books Searches History */}
              <div className="book-searches">
                <h2 className="main-title">Book Searches</h2>
                <table className="search-history-table">
                  <thead>
                    <tr>
                      <th>Search Name</th>
                      <th>Search Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(bookSearches) && bookSearches.map((search, i) => (
                      <tr key={i}>
                        <td><a href={`/books/book/${search.bookId}`} >{search.bookName}</a></td>
                        <td>{search.timeStampe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
