import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import serverStatusImage from "../assets/images/serverDown.jpg";
import "../pages/style/Login.scss";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [serverStatus, setServerStatus] = useState("Unknown");

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  // Check if server is running
  useEffect(() => {
    axios
      .get("http://localhost:7000/")
      .then((res) => {
        if (res.status === 200) {
          setServerStatus("Up");
        } else {
          setServerStatus("Down");
        }
      })
      .catch((err) => {
        setServerStatus("Down");
      });
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    if (serverStatus === "Up") {
      axios
        .get("http://localhost:7000/verify")
        .then((res) => {
          if (res.status === 200) {
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            console.log(err.response.data.msg);
          } else if (err.response.status === 500) {
            console.log(err.response.data.devErr);
            setError(err.response.data.err);
          }
        });
    }
  }, [serverStatus]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:7000/login", { email: email, password: password })
      .then((res) => {
        if (res.status == 200) {
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err.response.data.devErr);
        setError(err.response.data.err);
      });
  };
  if (serverStatus === "Down") {
    return (
      <div className="">
        <h1 className="text-3xl font-semibold text-center">Server Status:</h1>
        <div className="d-flex justify-content-center">
          <img
            src={serverStatusImage}
            alt={serverStatus}
            className="mx-auto d-block"
          />
        </div>
        <p className="text font-semibold text-center ">
          Please try again later!
        </p>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-center">
        <div className="w-full max-w-sm">
          <div className="login-form bg-white shadow-lg rounded-lg px-8 py-6 m-5">
            <h2 className="text-2xl font-bold mb-6">
              <span className="label-header">Log in to your account</span>
              <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && <p className="form__error">{error}</p>}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-gray-700 font-bold block mb-1"
                >
                  <span className="label-header">Email</span>
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                </label>
                <div className="flex">
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="text-gray-700 font-bold block mb-1"
                >
                  <span className="label-header">Password</span>
                  <FontAwesomeIcon icon={faLock} className="mr-2" />
                </label>
                <div className="flex">
                  <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="login-form__button">
                Log in
              </button>
            </form>
            <Link to="/register" className="text-blue-500 hover:underline">
              Don't have an account? Sign up here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
