import React, { useEffect, useState } from 'react'
import classes from "./styles.module.css"
import {
    Button,
    TextField,
    FormGroup,
    FormControl,
} from "@mui/material"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function Request() {

    const {id}=useParams();

    const[inputData,setInputData]=useState({
        id:id,
        Bookname:'',
        Description:'',
        Author:'',
        Field:'',
        PublicationDate:''
    
     })
     const navigate = useNavigate();

     useEffect(()=>{
        axios.get('http://localhost:3001/books/'+id)
        .then(res=>setInputData(res.data))
        .catch(err=>console.log(err))
     },[])


     const handelSubmit=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:3001/books/'+id,inputData)
        .then(res=>{
            alert("Book Request Successfully!")
            navigate('/view')
        })
    }

  return (

    <form onSubmit={handelSubmit} >
    <FormGroup>
        <FormControl className={classes.mb2}>
            <TextField
                label="ID"
                name="ID"
                value={inputData.id}
                disabled
                type='number'
            />   
        </FormControl>

        <FormControl className={classes.mb2}>
            <TextField
                label="Bookname"
                name="Bookname"
                value={inputData.Bookname}
                required
            onChange={e=>setInputData({...inputData,Bookname:e.target.value})}/>
        </FormControl>
        <FormControl className={classes.mb2}>
            <TextField
                label="Description"
                name="Description"
                value={inputData.Description}
                required
            onChange={e=>setInputData({...inputData,Description:e.target.value})}/>
        </FormControl>
      
        <FormControl className={classes.mb2}>
            <TextField
                label="Author"
                name="Author"
                value={inputData.Author}
                required
            onChange={e=>setInputData({...inputData,Author:e.target.value})}/>
        </FormControl>

        <FormControl className={classes.mb2}>
            <TextField
                label="Field"
                name="Field"
                value={inputData.Field}
                required
            onChange={e=>setInputData({...inputData,Field:e.target.value})}/>
        </FormControl>

        <FormControl className={classes.mb2}>
            <TextField
                label=" PublicationDate"
                name=" PublicationDate"
                value={inputData.PublicationDate}
                type="date"
            onChange={e=>setInputData({...inputData,PublicationDate:e.target.value})}/>
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
            Requist
        </Button>
    </div>
    
</form>
  )
}

export default Request