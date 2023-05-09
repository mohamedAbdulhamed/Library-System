import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import "../style/addBook.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileAlt,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function Updatebook() {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    name: "",
    description: "",
    author: "",
    field: [],
    dop: new Date().toISOString().substring(0, 10),
    pdf: null,
  });
  const [fileLoading, setFileLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:7000/get-book/" + id)
      .then((res) => {
        if (res.status === 200) {
          const bookData = res.data[0];
          const date = new Date(bookData.dop);
          bookData.dop = date.toISOString().substring(0, 10);
          setInputData(bookData);
        }
      })
      .catch((err) => {
        console.log(err.response.status + " " + err.response.data.devErr);
        alert(err.response.data.err);
        navigate("/books");
      });
  }, [id]);

  const handelSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    // for (const [key, value] of Object.entries(inputData)) {
    //   formData.append(key, value);
    // }
    formData.append("name", inputData.name);
    formData.append("description", inputData.description);
    formData.append("author", inputData.author);
    formData.append("field", inputData.field);
    formData.append("dop", inputData.dop);
    if (inputData.pdf !== null) {
      formData.append("pdf", inputData.pdf);
    }
    console.log(formData.get("name"));
    axios
      .post("http://localhost:7000/update-book/" + id, formData)
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.msg);
          navigate("/books");
        }
      })
      .catch((err) => {
        console.log(err.response.status + " " + err.response.data.devErr);
        alert(err.response.data.err);
      });
  };

  const handleCancel = () => {
    navigate("/books");
  };

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

  return (
    <form className="m-3" onSubmit={handelSubmit}>
      <FormGroup>
        <FormControl className={classes.mb2}>
          <TextField
            label="Bookname"
            name="Bookname"
            value={inputData.name}
            required
            onChange={(e) =>
              setInputData({ ...inputData, name: e.target.value })
            }
          />
        </FormControl>
        <FormControl className={classes.mb2}>
          <TextField
            label="Description"
            name="Description"
            value={inputData.description}
            required
            onChange={(e) =>
              setInputData({ ...inputData, description: e.target.value })
            }
          />
        </FormControl>

        <FormControl className={classes.mb2}>
          <TextField
            label="Author"
            name="Author"
            value={inputData.author}
            required
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

        <FormControl className={classes.mb2}>
          <TextField
            label={"DOP: " + inputData.dop}
            name="DOP"
            type="date"
            value={inputData.dop}
            onChange={(e) =>
              setInputData({ ...inputData, dop: e.target.value })
            }
          />
        </FormControl>
        <FormControl className={classes.mb2}>
        </FormControl>
        {/* File Upload */}
        <div className="title">Upload The Book File *If You Want To Update It*</div>
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
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>

        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </div>
    </form>
  );
}

export default Updatebook;
