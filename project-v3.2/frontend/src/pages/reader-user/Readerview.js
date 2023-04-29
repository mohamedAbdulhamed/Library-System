import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { Table ,FormControl,TextField} from '@mui/material';
function Readerview(){
  const [data,setData]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:3001/books')
    .then(res=>setData(res.data))
    .catch(err=>console.log(err))
  },[])
  const [search ,setSearch]=useState('');
  return(
  <div className="active-cyan-3 active-cyan-4 mb-4">
         <FormControl >
            <TextField
                label="Search"
                name="Search"
                onChange={(e) => setSearch(e.target.value)} placeholder='Search '/>
        </FormControl>
    <div className='container'>
      
      <Table className='table' >
          <thead>
            <tr>
              <th>Bookname</th>
              <th>Description</th>
              <th>Author</th>
              <th>Field</th>
              <th>PublicationDate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.filter((data) => {
                return search.toLowerCase()===''
                ?data 
                : data.Field.toLowerCase().includes(search);
            })
            .map((data,i)=>(
              <tr key={i}>
                <td>{data.Bookname}</td>
                <td>{data.Description}</td>
                <td>{data.Author}</td>
                <td>{data.Field}</td>
                <td>{data.PublicationDate}</td>
                <td>
                  <Link className='text-decoration-none btn btn-sm btn-primary'to={`/view/request/${data.id}`}>Request</Link>
                </td>
              </tr>

            ))}
          </tbody>
        </Table>
    </div>
  </div>
  )
}
export default Readerview