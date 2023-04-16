import React, { useState ,useEffect} from 'react'
import { useNavigate,useParams ,Link} from 'react-router-dom'
import axios from 'axios'
import './BookList.css';
function Viewbook() {
    const{id}=useParams();
    const navigate =useNavigate();
    const [Data,setData]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/books/'+id)
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
     },[])

  return (
    <div className='offset-lg-3 col-lg-6'>
       
      <div className='card'>
        <div className='card-title'>
          <h2 className='title'>Book details</h2>
        </div>
        <ul class="list-group list-group-flush">
              <li class="list-group-item"><h3>Bookname : {Data.Bookname}</h3></li>
              <li class="list-group-item"> <h3>Description : {Data.Description}</h3></li>
              <li class="list-group-item"><h3>Author : {Data.Author}</h3></li>
              <li class="list-group-item"><h3>Field : {Data.Field}</h3></li>
              <li class="list-group-item"><h3>PublicationDate : {Data.PublicationDate}</h3></li>
              <li class="list-group-item"><Link to="/books"  class="btn btn-primary">Back</Link></li>
          </ul>
      </div>
       
    </div>
  )
}

export default Viewbook