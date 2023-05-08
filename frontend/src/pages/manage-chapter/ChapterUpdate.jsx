import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../style/updateChapter.scss";
const ReqUpdate = () => {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    book_id: "",
  });
  const [books, setBooks] = useState([]);
  const handleChange = (e) => {
    setInputData({ ...inputData, book_id: e.target.value });
  };
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:7000/get-chapter/" + id)
      .then((res) => setInputData(res.data[0]))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:7000/get-books/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:7000/update-chapter/" + id, inputData)
      .then((res) => {
        alert("Data Updated Successfully!");
        navigate("/chapters");
      });
  };
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form form onSubmit={handleSubmit} className="container">
            <div className="card" style={{ textAlign: "left" }}>
              <div className="title">
                <h2 className="MR">Chapter update</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>title</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={inputData.title}
                        onChange={(e) =>
                          setInputData({ ...inputData, title: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>description</label>
                      <input
                        type="text"
                        name="description"
                        className="form-control"
                        value={inputData.description}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Book</label>
                      <select
                        name="books"
                        id="book_select"
                        className="form-control"
                        value={inputData.book_id}
                        onChange={handleChange}
                      >
                        {books.map((book, i) => (
                          <option value={book.id}>{book.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <button className="btn btn-success" type="submit">
                      Update
                    </button>
                    <Link to="/chapters" className="btn btn-danger">
                      Back
                    </Link>
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

export default ReqUpdate;
