import React from 'react'
import './users.css'
import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserCreate = () => {
    const [inputData, setInputData] = useState({
          name: '',
          email: '',
          password: '',
          phone: null
    })
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:7000/add-user', inputData)
        .then(res => {
            alert(res.data.msg)
            navigate('/users')
        })
        .catch(err => console.log(err))
    }
    
    return (
      <div>

          <div className="row">
              <div className="offset-lg-3 col-lg-6">
                  <form onSubmit={handleSubmit} className="container">

                      <div className="card" style={{"textAlign":"left"}}>
                          <div className="title">
                              <h2 className='MR'>Create User/Reader</h2>
                          </div>
                          <div className="card-body">

                              <div className="row">
                                  <div className="col-lg-12">
                                      <div className="form-group">
                                          <label class="form-label">Name</label>
                                          <input type="text" className="form-control" onChange={e => setInputData({...inputData,name: e.target.value})}/>
                                      </div>
                                  </div>
                                  <div className="col-lg-12">
                                      <div className="form-group">
                                          <label class="form-label">Email</label>
                                          <input type="email" className="form-control"  aria-describedby="emailHelp" onChange={e => setInputData({...inputData,email: e.target.value})}/>
                                      </div>
                                  </div>
                                  <div className="col-lg-12">
                                      <div className="form-group">
                                          <label>Password</label>
                                          <input type="password" class="form-control" onChange={e => setInputData({...inputData,password: e.target.value})}/>
                                      </div>
                                  </div>
                                  <div className="col-lg-12">
                                      <div className="form-group">
                                          <label>Phone</label>
                                          <input type="tel" className="form-control" onChange={e => setInputData({...inputData, phone: e.target.value})}/>
                                      </div>
                                  </div>
                                  <div className="col-lg-12">
                                      <div className="form-group">
                                         <button type="submit" className="btn btn-primary">Submit</button>
                                         {/* ! Again, back button can't work with a link it needs to be done with a function using navigate ! */}
                                         <Link to="/users" className="btn btn-danger">Back</Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  );
}                              

export default UserCreate