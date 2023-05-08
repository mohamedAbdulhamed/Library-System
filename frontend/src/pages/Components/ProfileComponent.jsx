import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faClock,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./profile.css";

const ProfileCard = (props) => {
  const [bookNames, setBookNames] = useState([]);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (props.requests && props.requests.length > 0) {
      const promises = props.requests.map((request) =>
        axios.get("http://localhost:7000/get-book/" + request.book_id)
      );
      Promise.all(promises)
        .then((responses) => {
          const names = responses.map((response) => response.data[0].name);
          setBookNames(names);
        })
        .catch((err) => {
          if (err.response.status === 500) {
            console.log(err.response.data.devErr)
            setErr(err.response.data.err);
          } else {
            setErr(err.response.data.err);
          }
        });
    }
  }, [props.requests]);
  function handleGoBack() {
    navigate('/dashboard');
  }
  function getStatusIcon(status) {
    if (status === 1) {
      return <FontAwesomeIcon icon={faCheck} />;
    } else if (status === -1) {
      return <FontAwesomeIcon icon={faXmark} />;
    } else {
      return <FontAwesomeIcon icon={faClock} />;
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
      <div className="profile-card p-3">
        <div className="profile-card-header">
          <h3>Profile</h3>
          <button className="back-button" onClick={handleGoBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Go Back
          </button>
        </div>
        <div className="profile-card-body">
          <h5>FullName: {props.name}</h5>
          <h5>Email: {props.email}</h5>
          <hr />
          {/* Requests History */}
          {props.type === 1 && props.requests && props.requests.length > 0 ? (
            <>
              <h3>Your Requests</h3>
              <ul className="request-list d-flex p-3">
                {props.requests.map((request, i) => (
                  <li key={i}>
                    {getStatusIcon(request.status)}
                    <span>{bookNames[i]}</span>
                  </li>
                ))}
              </ul>
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
