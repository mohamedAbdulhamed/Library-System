import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ReqCreate = () => {
  const [users, ] = useState([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
  ]);
  const [books, ] = useState([
    { id: 1, name: "Book 1" },
    { id: 2, name: "Book 2" },
  ]);
  const [inputData, setInputData] = useState({
    user_id: 1, 
    book_id: 1, 
  });
  const navigate = useNavigate();

  const book_select = (e) => {
    setInputData({ ...inputData, book_id: e.target.value });
  };

  const user_select = (e) => {
    setInputData({ ...inputData, user_id: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Request Created!");
    navigate("/requests");
  };

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
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
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
                        {books.map((book) => (
                          <option key={book.id} value={book.id}>
                            {book.name}
                          </option>
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
