 import React, { useState } from 'react'
 import { useEffect } from 'react';
 import axios from "axios";
 import { Link } from 'react-router-dom';
 import './BookList.css';
 import { useNavigate } from 'react-router-dom';
import { Table } from '@mui/material';

 function Booklist() {

  const [data,setData]=useState([])
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:7000/get-books')
    // check if empty
    .then(res=> setData(res.data))
    .catch(err=>console.log(err))
  },[])

   return (
    
  
    <div className='container'style={{margin: 'auto',
    margineft: '-68px'}}>
      <h2 className='table_header'>Booklist</h2>
     <div className='add table_create_btn'><Link to="/add" className='btn btn-primary my-3 button' >New Book</Link></div>
     <div className='table table-striped'>
      <Table className='table'>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Description</th>
              <th>Author</th>
              <th>Field</th>
              <th>DOP</th>
              <th>PDF</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d,i)=>(
              <tr key={i}>
                <td>{d.name}</td>
                { d.description.length > 50 ? <td>{d.description.slice(0, 50) + '...'}</td> : <td>{d.description}</td> }
                <td>{d.author}</td>
                <td>{d.field}</td>
                <td>{d.dop.slice(0, 10)}</td>
                <td>{d.pdf}</td>
                <td className='td'>
                  <Link className='btn btn-success button'to={`/update/${d.id}`}>Update</Link>
                  <button className='btn btn-danger button'onClick={e=>handleDelete(d.id)}><span></span></button>
                  <Link className='btn btn-primary button'to={`/view/${d.id}`}>View</Link>
                  <Link className='btn btn-info button'to={`/pdf/${d.id}`}>PDF</Link>

                </td>
              </tr>

            ))}
          </tbody>
        </Table>
     </div>


    </div>


   )

   function handleDelete(id){
    const confirm=window.confirm("Are you sure to delete this book?");
    if(confirm){

      axios.delete('http://localhost:7000/delete-book/'+id)
      .then(res=>{
        alert(res.data.msg);
        window.location.reload();
      })
      .catch(err=>console.log(err))

    }

   }
 }
 
 export default Booklist