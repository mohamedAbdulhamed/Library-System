import React from 'react'
import './Chapter.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const ChapterCreate = () => {
    const [inputData, setInputData] = useState({
          title: '',
          description:'',
          book_id: ''
    })
    const [books, setBooks] = useState([])
    // selceted book value
    const handleChange = (e) => {
        setInputData({...inputData, book_id: e.target.value})
      };
    useEffect(()=> {
        axios.get('http://localhost:7000/get-books/')
        .then(res => 
            {
                setBooks(res.data)
                setInputData({...inputData, book_id: res.data[0].id})
            })
        .catch(err => console.log(err))
    }, [])
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:7000/add-chapter', inputData)
        .then(res => {
            alert(res.data.msg)
            navigate('/Chapter')

        })
    }
    
    return (
      <div>

          <div className="row">
              <div className="offset-lg-3 col-lg-6">
                  <form onSubmit={handleSubmit} className="container" >

                      <div className="card" style={{"textAlign":"left"}}>
                          <div className="title">
                              <h2 className='MR'>Manage Chapter</h2>
                          </div>
                          <div className="card-body">

                              <div className="row">
                                  <div className="col-lg-12">
                                      <div className="form-group">
                                          <label>title</label>
                                          <input type="text" className="form-control" onChange={e => setInputData({...inputData,title: e.target.value})}/>
                                      </div>
                                  </div>
                                  <div className="col-lg-12">
                                      <div className="form-group">
                                          <label>description</label>
                                          <input type="text" className="form-control" onChange={e => setInputData({...inputData,description: e.target.value})}/>
                                      </div>
                                  </div>
                                  <div className="col-lg-12">
                                      <div className="form-group">
                                          <label>Book</label>
                                          <select name="books" id="book_select" className="form-control" value={inputData.book_id} onChange={handleChange}>
                                                {books.map((book, i)=> (
                                                    <option value={book.id}>{book.name}</option>
                                                ))}
                                          </select>
                                      </div>
                                    </div>
                                 
                                  <div className="col-lg-12">
                                      <div className="form-group">
                                         <button type="submit" className="btn btn-primary">Submit</button>
                                         <Link to="/Chapter" className="btn btn-danger">Back</Link>
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

export default ChapterCreate