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


function Updatebook() {

    const {id}=useParams();
    const[inputData,setInputData]=useState({
        name:'',
        description:'',
        author:'',
        field:'',
        dop:new Date(),
        pdf:''
     })
     const navigate = useNavigate();

     useEffect(()=>{
        axios.get('http://localhost:7000/get-book/'+id)
        .then(res=>{
            setInputData(res.data[0])
        })
        .catch(err=>{
                alert("Something went wrong!")
                navigate('/books')
            })
     },[])


     const handelSubmit=(event)=>{
        event.preventDefault();
        axios.post('http://localhost:7000/update-book/'+id, inputData)
        .then(res=>{
            alert(res.data.msg)
            navigate('/books')
        })
        .catch(err=>alert("Something went wrong!"))
    }

  return (

    <form onSubmit={handelSubmit} >
    <FormGroup>
        <FormControl className={classes.mb2}>
            <TextField
                label="Bookname"
                name="Bookname"
                value={inputData.name}
                required
            onChange={e=>setInputData({...inputData,name:e.target.value})}/>
        </FormControl>
        <FormControl className={classes.mb2}>
            <TextField
                label="Description"
                name="Description"
                value={inputData.description}
                required
            onChange={e=>setInputData({...inputData,description:e.target.value})}/>
        </FormControl>
      
        <FormControl className={classes.mb2}>
            <TextField
                label="Author"
                name="Author"
                value={inputData.author}
                required
            onChange={e=>setInputData({...inputData,author:e.target.value})}/>
        </FormControl>

        <FormControl className={classes.mb2}>
            <TextField
                label="Field"
                name="Field"
                value={inputData.field}
                required
            onChange={e=>setInputData({...inputData,field:e.target.value})}/>
        </FormControl>

        <FormControl className={classes.mb2}>
            <TextField
                label={"DOP: " + inputData.dop} // Date of Publication
                name="DOP"
                // This is the date format that the date picker expects * But unfortunately it is not working :)
                // value={inputData.dop}
                type="date"
            onChange={e=>setInputData({...inputData,dop:e.target.value})}/>
        </FormControl>

        <FormControl className={classes.mb2}>
            <TextField
                label="PDF"
                name="PDF"
                value={inputData.pdf}
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
            Update
        </Button>
    </div>
    
</form>
  )
}

export default Updatebook