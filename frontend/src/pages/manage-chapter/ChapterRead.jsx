import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../style/ViewChapter.scss";
const ChapterRead = () => {
  const { id } = useParams();
  const [books, setBooks] = useState([
    {
      id: 0,
      name: "",
    },
  ]);
  const [Data, setdata] = useState({
    id: 0,
    title: "",
    description: "",
    book_id: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:7000/get-chapter/" + id)
      .then((res) => setdata(res.data[0]))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:7000/get-books/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  function GetBookName(id) {
    let book = books.find((book) => book.id === id);
    return book ? book.name : "";
  }

  return (
    <div className="offset-lg-3 col-lg-6">
      <Link to="/chapters" className="btn btn-primary">
        <FontAwesomeIcon icon={faArrowLeft} className="icon" />
        Back
      </Link>
      <div className="card">
        <div className="title">
          <h2 className="MR">Chapter Details</h2>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <h3>title of chapter : {Data.title}</h3>
          </li>
          <li className="list-group-item">
            <h3>description is : {Data.description}</h3>
          </li>
          <li className="list-group-item">
            <h3>book : {GetBookName(Data.book_id)}</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChapterRead;
