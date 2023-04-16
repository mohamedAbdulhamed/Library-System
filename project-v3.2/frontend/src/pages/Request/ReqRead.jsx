import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
function ReqRead() {
    const {id} = useParams()
    
    const [Data, setdata] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/Request/'+id)
        .then(res => setdata(res.data))
        .catch(err => console.log(err))
    }, [id])
    return (  
      <div className="offset-lg-3 col-lg-6"> 
      <div class="card">
      <div className="title">
          <h2 className='MR'>Request Details</h2>
      </div>
       <ul class="list-group list-group-flush">
            <li class="list-group-item"><h3>Email is : {Data.Email}</h3></li>
           <li class="list-group-item"> <h3>book name is : {Data.name}</h3></li>
           <li class="list-group-item"><h3>date Of Issuing is : {Data.dateOfIssuing}</h3></li>
           <li class="list-group-item"><h3>date Of Return is : {Data.dateOfReturn}</h3></li>
           <li class="list-group-item"><Link to="/Request"  class="btn btn-primary">Back</Link></li>
      </ul>
      </div>
      </div>

  );

}

export default ReqRead
