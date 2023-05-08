import React, { useEffect, useState, setState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "./Register.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function Register() {
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:7000/verify")
      .then((res) => {
        if (res.status === 200) {
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          console.log(err.response.data.msg);
        } else if (err.response.status === 500) {
          console.log(err.response.data.devErr);
          setErr(err.response.data.err);
        }
      });
  }, []);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "fullName") {
      setName(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "phone") {
      setPhone(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = () => {
    console.log(name, email, phone, password, confirmPassword);
    if (!name) alert("Your full name is required!");
    if (!email) alert("Email is required");
    if (!validateEmail(email)) alert("Email is invalid!");
    if (!password) alert("Password is required!");
    if (!validatePassword(password)) alert("Password is invalid!");
    if (!confirmPassword) alert("Confirm Password is required!");
    if (password !== confirmPassword)
      alert("Password and Confirm Password do not match!");
    if (
      name &&
      email &&
      validateEmail(email) &&
      password &&
      validatePassword(password) &&
      confirmPassword &&
      password === confirmPassword
    ) {
        let data = {  };
      if (phone) {
        if (validatePhone(phone)) {
          console.log("Form is valid");
          data = { name, email, phone, password };
        } else {
          setErr("Phone is invalid!");
        }
      } else {
        console.log("Form is valid");
        data = { name, email, password };
      }
      axios
      .post("http://localhost:7000/register", data)
      .then((res) => {
        if (res.status === 200) {
          setMsg("Registered successfully!");
          setInterval(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
    }
  };

  function validatePhone(phone) {
    /*
            Valid formats:

            (123) 456-7890
            (123)456-7890
            123-456-7890
            123.456.7890
            1234567890
            +31636363634
            075-63546725
        */
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
      phone
    );
  }

  function validatePassword(pw) {
    /*
            At least one uppercase letter
            At least one lowercase letter
            At least one digit
            At least one special symbol
            should be more than 8 character
        */

    return (
      /[A-Z]/.test(pw) &&
      /[a-z]/.test(pw) &&
      /[0-9]/.test(pw) &&
      /[^A-Za-z0-9]/.test(pw) &&
      pw.length >= 8
    );
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

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
      <div className="form">
      <p className='p-3 font-semibold'>Already have an account? <Link to={'/login'}>Login in now</Link></p>
        <div className="form-body">
          <div className="username">
            <label className="form__label" for="firstName">
              Full Name{" "}
            </label>
            <input
              className="form__input"
              type="text"
              value={name}
              onChange={(e) => handleInputChange(e)}
              id="fullName"
              placeholder="FullName"
            />
          </div>
          <div className="email">
            <label className="form__label" for="email">
              Email{" "}
            </label>
            <input
              type="email"
              id="email"
              className="form__input"
              value={email}
              onChange={(e) => handleInputChange(e)}
              placeholder="Email"
            />
          </div>
          <PhoneInput
            className="form__input"
            placeholder="Enter phone number"
            value={phone}
            onChange={setPhone}
          />

          <div className="password">
            <label className="form__label" for="password">
              Password{" "}
            </label>
            <input
              className="form__input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
              placeholder="Password"
            />
          </div>
          <div className="confirm-password">
            <label className="form__label" for="confirmPassword">
              Confirm Password{" "}
            </label>
            <input
              className="form__input"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => handleInputChange(e)}
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div className="footer">
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="btn text-primary btn-dark btn-lg btn-block"
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
