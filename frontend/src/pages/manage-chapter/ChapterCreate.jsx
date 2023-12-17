import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/addChapter.scss";

const ChapterCreate = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    title: "Enter title",
    description: "Enter description",
    book_id: "",
  });

  const handleChange = (e) => {
    setInputData({ ...inputData, book_id: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Chapter created:", inputData);

    navigate("/chapters");
  };

  // Mocked data for books (replace with actual data or API call)
  const books = [
    { id: 1, name: "Book 1" },
    { id: 2, name: "Book 2" },
  ];

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <form onSubmit={handleSubmit}>
          <div className="card" style={{ textAlign: "left" }}>
            <div className="title">
              <h2 className="MR">Manage Chapter</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
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
                    <label>Description</label>
                    <input
                      type="text"
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
                      <option value="">Select a book</option>
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
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <Link to="/chapters" className="btn btn-danger">
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
  );
};

export default ChapterCreate;
