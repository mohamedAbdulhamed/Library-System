import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignIn,
  faUserLock,
  faHome,
  faInfoCircle,
  faShieldAlt,
  faAdd,
  faCircleDot,
  faBook,
  faSignOut,
  faUser,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import "../style/Navbar.scss";

const Navbar = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:7000/verify")
      .then((res) => {
        if (res.status === 200 && res.data.loggedIn) {
          setLoggedIn(true);
          setUser(res.data.user.user);
        }
        setIsLoading(false); // set loading state to false
      })
      .catch((err) => {
        console.log(err.response.data.devErr);
        setIsLoading(false); // set loading state to false
      });
  }, [loggedIn]);

  function logout() {
    if (loggedIn) {
      axios
        .get("http://localhost:7000/logout")
        .then((res) => {
          if (res.data.status === 200) {
            setLoggedIn(false);
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err.response.data.devErr);
        });
    }
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <FontAwesomeIcon icon={faCircleDot} /> My App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/about">
                <FontAwesomeIcon icon={faInfoCircle} /> About
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/privacy" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/privacy">
                <FontAwesomeIcon icon={faShieldAlt} /> Privacy
              </Link>
            </li>
          </ul>
          <select
            className="form-select me-2"
            aria-label="Login/Logout/Signup"
            onChange={(event) => {
              const option = event.target.value;
              if (option === "login") {
                navigate("/login");
              } else if (option === "signup") {
                navigate("/register");         
              }else if (option === "books") {
                navigate("/books");
              } else if (option === "logout") {
                logout();
              }
            }}
          >
            <option value="">Select an option</option>
            {!loggedIn ? (
              <>
                <option value="login">
                  <FontAwesomeIcon icon={faSignIn} /> Login
                </option>
                <option value="signup">
                  <FontAwesomeIcon icon={faUserLock} /> Signup
                </option>
              </>
            ) : (
              <>
                <option value="books">
                  <FontAwesomeIcon icon={faBook} /> Books List
                </option>
                <option value="logout">
                  <FontAwesomeIcon icon={faSignOut} /> Logout
                </option>
              </>
            )}
          </select>
          {!isLoading && loggedIn && (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome, {user.name}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    <FontAwesomeIcon icon={faUser} /> My Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/settings">
                    <FontAwesomeIcon icon={faCog} /> Settings
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
