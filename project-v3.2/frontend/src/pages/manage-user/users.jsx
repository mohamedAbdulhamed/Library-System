import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './users.css';
import { useNavigate } from 'react-router-dom';
import { Table } from '@mui/material';

function Users() {

 const [users,setUsers]=useState([])
 const navigate = useNavigate();
 useEffect(()=>{
   axios.get('http://localhost:7000/get-users')
   .then(res=> setUsers(res.data))
   .catch(err=>console.log(err))
 },[])


  return (
   
 
   <div className='container'style={{margin: 'auto',
   margineft: '-68px'}}>
     <h2>users</h2>
    <div className='table table-striped'>
    <div className='add table_create_btn'><Link to="/userCreate" className='btn btn-primary my-3 button' >New User</Link></div>
     <Table className='table'>
         <thead>
           <tr>
             <th>ID</th>
             <th>Name</th>
             <th>Email</th>
             <th>Phone</th>
             <th>Status</th>
             <th>Action</th>
           </tr>
         </thead>
         <tbody>
           {users.map((user,i)=>(
             <tr key={i}>
               <td>{user.id}</td>
               <td>{user.name}</td>
               <td>{user.email}</td>
               {user.phone ? <td>{user.phone}</td> : <td>Not Available</td>}
               {user.status ? <td>Active</td> : <td>In-active</td>}
               <td className='td'>
                  <Link to={'/userUpdate/'+user.id} className='btn btn-primary button'>Update</Link>                
                 <button className='btn btn-danger button'onClick={e=>handelDelete(user.id)}><span></span></button>
               </td>
             </tr>

           ))}
         </tbody>
       </Table>
    </div>


   </div>


  )

  function handelDelete(id){
   const confirm=window.confirm("Are you sure to delete this user?");
   if(confirm){

     axios.delete('http://localhost:7000/delete-user/'+id)
     .then(res=>{
       alert(res.data.msg);
       window.location.reload();
     })
     .catch(err=>console.log(err))

   }

  }
}

export default Users