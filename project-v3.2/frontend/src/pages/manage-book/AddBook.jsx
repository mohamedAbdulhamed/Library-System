import React, { useState } from 'react'
import classes from "./styles.module.css"
import {
    Button,
    TextField,
    FormGroup,
    FormControl,
} from "@mui/material"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
 
function Addbook() {
 const[inputData,setInputData]=useState({
    name:'',
    description:'',
    author:'',
    field:'',
    dop: new Date(),
    pdf:''
 })
 const navigate = useNavigate();
 const handelSubmit=(event)=>{
    event.preventDefault();
    axios.post('http://localhost:7000/add-book',inputData)
    .then(res=>{
        alert(res.data.msg)
        navigate('/books')
    })
    .catch(err=>{
        alert(err.response.data.msg)
    })
 }
  return (
    <form onSubmit={handelSubmit} >
                    <FormGroup>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Bookname"
                                name="Bookname"
                                required
                            onChange={e=>setInputData({...inputData,name:e.target.value})}/>
                        </FormControl>
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Description"
                                name="Description"
                                required
                            onChange={e=>setInputData({...inputData,description:e.target.value})}/>
                        </FormControl>
                      
                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Author"
                                name="Author"
                                required
                            onChange={e=>setInputData({...inputData,author:e.target.value})}/>
                        </FormControl>

                        <FormControl className={classes.mb2}>
                            <TextField
                                label="Field"
                                name="Field"
                                required
                            onChange={e=>setInputData({...inputData,field:e.target.value})}/>
                        </FormControl>

                        <FormControl className={classes.mb2}>
                            <TextField
                                label=" PublicationDate"
                                name=" PublicationDate"
                                type="date"
                            onChange={e=>setInputData({...inputData,pod:e.target.value})}/>
                        </FormControl>

                        <FormControl className={classes.mb2}>
                            <TextField
                            // Test for PDF Link
                                label=" PDF Link"
                                name=" PDF Link"
                            onChange={e=>setInputData({...inputData,pdf:e.target.value})}/>
                        </FormControl>

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
  )
}

export default Addbook