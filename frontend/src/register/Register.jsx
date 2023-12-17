import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../pages/style/Login.scss";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }

    const minPasswordLength = 8;
    if (password.length < minPasswordLength) {
      setError(`Password must be at least ${minPasswordLength} characters long`);
      return;
    }

    setError("");

    const user = {
      name: name,
      email: email,
      isAuthenticated: true,
      role: "admin",
      banned: false,
      isFirstTime: true,
    };

    localStorage.setItem("user", JSON.stringify(user));

    if (!localStorage.getItem("searchHistory")) {
      localStorage.setItem("searchHistory", JSON.stringify([]));
    }

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-center">
        <div className="w-full max-w-sm">
          <div className="login-form bg-white shadow-lg rounded-lg px-8 py-6 m-5">
            <h2 className="text-2xl font-bold mb-6">
              <span className="label-header">Join our community and unlock a world of possibilities!</span>
              <FontAwesomeIcon icon={faRightToBracket} className="mr-2" />
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && <p className="form__error">{error}</p>}
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-gray-700 font-bold block mb-1"
                >
                  <span className="label-header">Full Name</span>
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    placeholder="Enter your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
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
                Continue
              </button>
            </form>
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Log in here!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
