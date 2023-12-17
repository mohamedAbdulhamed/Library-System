import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../style/updateChapter.scss";

const ReqUpdate = () => {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    title: "Sample Title",
    description: "Sample Description",
    book_id: 1,
  });
  const [books, setBooks] = useState([
    { id: 1, name: "Book 1" },
    { id: 2, name: "Book 2" },
  ]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputData({ ...inputData, book_id: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Data Updated Successfully!");
    navigate("/chapters");
  };

  useEffect(() => {
    setInputData({
      title: "Sample Title",
      description: "Sample Description",
      book_id: 1,
    });

    // Simulate fetching the list of books
    setBooks([
      { id: 1, name: "Book 1" },
      { id: 2, name: "Book 2" },
    ]);
  }, [id]);

  return (
    <div className="container">
      <div className="col-lg-6">
        <form onSubmit={handleSubmit} className="container">
          <div className="card" style={{ textAlign: "left" }}>
            <div className="title">
              <h2 className="MR">Chapter Update</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={inputData.title}
                      onChange={(e) =>
                        setInputData({
                          ...inputData,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReqUpdate;
