import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../style/ViewChapter.scss";

const ChapterRead = () => {

  const chapterData = {
    id: 1,
    title: "Chapter 1",
    description: "Introduction",
    book_id: 1,
  };

  const books = [
    { id: 1, name: "Book 1" },
    { id: 2, name: "Book 2" },
  ];

  const GetBookName = (id) => {
    let book = books.find((book) => book.id === id);
    return book ? book.name : "";
  }

  return (
    <div className="container">
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
            <h3>Title : {chapterData.title}</h3>
          </li>
          <li className="list-group-item">
            <h3>Descreption : {chapterData.description}</h3>
          </li>
          <li className="list-group-item">
            <h3>Book : {GetBookName(chapterData.book_id)}</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChapterRead;
