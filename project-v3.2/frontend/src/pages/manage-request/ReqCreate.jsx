import React, { useEffect } from "react";
import "./Request.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//   Email name dateOfIssuing   dateOfReturn
const ReqCreate = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [inputData, setInputData] = useState({});
  const navigate = useNavigate();
  const book_select = (e) => {
    setInputData({ ...inputData, book_id: e.target.value });
  };
  const user_select = (e) => {
    setInputData({ ...inputData, user_id: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputData.user_id === undefined) inputData.user_id = users[0].id;
    if (inputData.book_id === undefined) inputData.book_id = books[0].id;
    console.log(inputData);
    axios
      .post("http://localhost:7000/create-request/", inputData)
      .then((res) => {
        if (res.data === "Request Created!") alert(res.data);
        else {
          alert(res.data.msg);
          console.log(res.data.err);
        }
        navigate("/Request");
      })
      .catch((err) => {
        alert("Error Occured, Please Try Again Later!");
        navigate("/Request");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:7000/get-users/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:7000/get-books/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="row" style={{ margin: "auto" }}>
        <div className="offset-lg-3 col-lg-6">
          <form
            onSubmit={handleSubmit}
            className="container"
            style={{ marginTop: "-90px" }}
          >
            <div className="card" style={{ textAlign: "left" }}>
              <div className="title">
                <h2 className="MR">Create Request</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>User</label>
                      <select
                        name="users"
                        className="form-control"
                        value={inputData.user_id}
                        onChange={user_select}
                      >
                        {users.map((user, i) => (
                          <option value={user.id}>{user.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <label>Book</label>
                      <select
                        name="books"
                        className="form-control"
                        value={inputData.book_id}
                        onChange={book_select}
                      >
                        {books.map((book, i) => (
                          <option value={book.id}>{book.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary m-3">
                        Request
                      </button>
                      <Link to="/requests" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReqCreate;
