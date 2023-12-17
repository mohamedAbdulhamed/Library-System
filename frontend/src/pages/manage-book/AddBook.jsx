import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import classes from "./styles.module.css";
import {
  Button,
  TextField,
  FormGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "../style/addBook.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileAlt,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Addbook = () => {
  const navigate = useNavigate();
  const errorRef = useRef(null);
  const [err, setErr] = useState("");
  const [fileLoading, setFileLoading] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    author: "",
    field: [],
    dop: "",
    pdf: null,
  });

  const deleteFile = (e) => {
    e.preventDefault();
    setInputData({ ...inputData, pdf: null });
  };

  const uploadHandler = (e) => {
    setFileLoading(true);
    setInputData({ ...inputData, pdf: e.target.files[0] });
    setTimeout(() => {
      setFileLoading(false);
    }, 1400);
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    console.log(inputData.dop);

    // Check if all the fields are filled
    if (
      inputData.name === "" ||
      inputData.description === "" ||
      inputData.author === "" ||
      inputData.field === "" ||
      inputData.pdf === null
    ) {
      setErr("Please fill all the fields!");
      return;
    }

    alert("Book Added Successfully!");
  };

  useEffect(() => {
    if (err) {
      if (errorRef.current) {
        window.scrollTo({
          top: errorRef.current.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [err]);

  const handleGoBack = () => {
    navigate('/books');
  };

  return (
    <>
      <form className="form-container" onSubmit={handelSubmit}>
        {err && (
          <div ref={errorRef} className="error">
            {err}
          </div>
        )}
        <FormGroup>
          <FormControl className="my-form-input">
            <TextField
              label="Bookname"
              name="Bookname"
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </FormControl>
          <FormControl className="my-form-input">
            <TextField
              label="Description"
              name="Description"
              onChange={(e) =>
                setInputData({ ...inputData, description: e.target.value })
              }
            />
          </FormControl>

          <FormControl className="my-form-input">
            <TextField
              label="Author"
              name="Author"
              onChange={(e) =>
                setInputData({ ...inputData, author: e.target.value })
              }
            />
          </FormControl>
          <FormControl className="my-form-input">
            <InputLabel id="field-label">Field</InputLabel>
            <Select
              labelId="field-label"
              name="Field"
              multiple
              value={
                Array.isArray(inputData.field)
                  ? inputData.field
                  : [...[inputData.field]]
              }
              onChange={(e) =>
                setInputData({ ...inputData, field: e.target.value })
              }
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="fiction">Fiction</MenuItem>
              <MenuItem value="non-fiction">Non-Fiction</MenuItem>
              <MenuItem value="biography">Biography</MenuItem>
              <MenuItem value="history">History</MenuItem>
              <MenuItem value="self-help">Self-Help</MenuItem>
              <MenuItem value="historical-fiction">Historical Fiction</MenuItem>
              <MenuItem value="classics">Classics</MenuItem>
              <MenuItem value="romance">Romance</MenuItem>
              <MenuItem value="carfts-hobbies">Crafts & Hobbies</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="my-form-input">
            <TextField
              id="dop"
              label="Publication Date"
              type="date"
              variant="outlined"
              value={inputData.dop}
              onChange={(event) =>
                setInputData({ ...inputData, dop: event.target.value })
              }
              required
            />
          </FormControl>
          {/* File Upload */}
          <div className="title">Upload The Book File!</div>
          <div className="file-card">
            <div className="file-inputs">
              <input type="file" onChange={uploadHandler} />
              <button>
                <i>
                  <FontAwesomeIcon icon={faFilePdf} />
                </i>
                Upload
              </button>
            </div>
            <p className="main">Supported files</p>
            <p className="sub">.pdf, .doc, .docx, .txt</p>
          </div>
          {/* FilesList */}
          <ul className="file-list">
            {inputData.pdf !== null && (
              <li className="list-item">
                <FontAwesomeIcon icon={faFileAlt} />
                <p>{inputData.pdf.name}</p>
                <div className="actions">
                  {fileLoading && (
                    <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                  )}
                  {!fileLoading && (
                    <FontAwesomeIcon icon={faTrash} onClick={deleteFile} />
                  )}
                </div>
              </li>
            )}
          </ul>
        </FormGroup>

        <div className={classes.btnContainer}>


          <Button variant="contained" color="secondary" onClick={handleGoBack}>
            Cancel
          </Button>

          <Button type="submit" variant="contained" color="primary">
            CREATE
          </Button>
        </div>
      </form>
    </>
  );
}

export default Addbook;
