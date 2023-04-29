import React, { useState, useRef, useEffect } from 'react'
import classes from "./styles.module.css"
import {
  Button,
  TextField,
  FormGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FormData from 'form-data'
import '../style/addBook.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFilePdf, faFileAlt, faSpinner, faTrash} from '@fortawesome/free-solid-svg-icons'

 
function Addbook() {
  const errorRef = useRef(null);
  const [err, setErr] = useState('');
  const [fileLoading, setFileLoading] = useState(false);
  const[inputData,setInputData]=useState({
    name: '',
    description: '',
    author: '',
    field: [],
    dop: '',
    pdf: null
  })
  const deleteFile = (e) => {
    e.preventDefault();
    setInputData({...inputData, pdf: null});
  }

  const uploadHandler = (e) => {
    setFileLoading(true);
    setInputData({...inputData, pdf: e.target.files[0]});
    setTimeout(() => {
      setFileLoading(false);
    }, 1400);
  };

  const navigate = useNavigate();
  const handelSubmit=(event)=>{
    event.preventDefault();
    console.log(inputData.dop)

    // Check if all the fields are filled
    if (inputData.name === '' || inputData.description === '' || inputData.author === '' || inputData.field === '' || inputData.pdf === null) {
      setErr("Please fill all the fields!");
      return;
    }
    let formData = new FormData();
    formData.append('name', inputData.name);
    formData.append('description', inputData.description);
    formData.append('author', inputData.author);
    formData.append('field', inputData.field);
    formData.append('dop', inputData.dop);
    if (inputData.pdf !== null) {
      formData.append('pdf', inputData.pdf);
    }
    axios.post('http://localhost:7000/add-book', formData)
    .then(res=>{
      if (res.status === 200) {
        alert(res.data.msg)
        navigate('/books')
      }else {
        setErr(res.data.msg);
      }
    })
    .catch(err=>{
      console.log(err.response.data.msg);
      setErr("Error occured!");
    })
  }
  useEffect(() => {
    if (err) {
      if (errorRef.current) {
        window.scrollTo({ top: errorRef.current.offsetTop, behavior: 'smooth' });
      }
    }
  }, [err]);

  return (
    <>
    <form className='form-container' onSubmit={handelSubmit} >
      {err && <div ref={errorRef} className="error">{err}</div>}
      <FormGroup>
        <FormControl className="my-form-input">
        <TextField
          label="Bookname"
          name="Bookname"
          
        onChange={e=>setInputData({...inputData,name:e.target.value})}/>
        </FormControl>
        <FormControl className="my-form-input">
        <TextField
          label="Description"
          name="Description"
          
        onChange={e=>setInputData({...inputData,description:e.target.value})}/>
        </FormControl>
        
        <FormControl className="my-form-input">
        <TextField
          label="Author"
          name="Author"
          
        onChange={e=>setInputData({...inputData,author:e.target.value})}/>
        </FormControl>
        <FormControl className="my-form-input">
          <InputLabel id="field-label">Field</InputLabel>
          <Select
            labelId="field-label"
            name="Field"
            multiple
            value={Array.isArray(inputData.field) ? inputData.field : [...[inputData.field]]}
            onChange={(e) => setInputData({...inputData, field: e.target.value})}
            renderValue={(selected) => selected.join(', ')}
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
          onChange={(event)=>setInputData({...inputData,dop:event.target.value})}
          required/>
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
          <p className='main'>Supported files</p>
          <p className='sub'>.pdf, .doc, .docx, .txt</p>
        </div>
        {/* FilesList */}
        <ul className='file-list'>
          {inputData.pdf !== null && (
            <li className='list-item'>
              <FontAwesomeIcon icon={faFileAlt} />
              <p>{inputData.pdf.name}</p>
              <div className="actions">
                {fileLoading &&
                  <FontAwesomeIcon icon={faSpinner} className='fa-spin' />
                }
                {!fileLoading &&
                  <FontAwesomeIcon icon={faTrash} onClick={deleteFile} />
                }
              </div>
            </li>
          )}
        </ul>
      </FormGroup>
      
      <div className={classes.btnContainer}>
        <Button
        variant="contained"
        color="secondary"
        >
        Cancel
        
        </Button>
        
        <Button type="submit" variant="contained" color="primary" >
        CREATE
        </Button>
      </div>
    </form>
    </>
  )
}

export default Addbook