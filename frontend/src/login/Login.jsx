import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../pages/style/Login.scss";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Wrong email address!");
      return;
    }

    const minPasswordLength = 8;
    if (password.length < minPasswordLength) {
      setError("Wrong password!");
      return;
    }

    setError("");

    const user = {
      name: email.split("@")[0],
      email: email,
      isAuthenticated: true,
      role: "admin",
      banned: false,
      isFirstTime: false,
    };

    localStorage.setItem("user", JSON.stringify(user));

    if (!localStorage.getItem("searchHistory")) {
      localStorage.setItem("searchHistory", JSON.stringify([]));
    }

    navigate("/dashboard");
    window.location.reload();
  };

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
