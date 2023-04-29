import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const ChapterRead = () => {
    const {id} = useParams()
    const [books, setBooks] = useState([{
        id: 0,
        name: ''
    }])
    const [Data, setdata] = useState({
        id: 0,
        title: '',
        description: '',
        book_id: 0
    })

    useEffect(() => {
        axios.get('http://localhost:7000/get-chapter/'+id)
        .then(res => setdata(res.data[0]))
        .catch(err => console.log(err))

        axios.get('http://localhost:7000/get-books/')
        .then(res => setBooks(res.data))
        .catch(err => console.log(err))
    }, [id])

    function GetBookName(id) {
        let book = books.find(book => book.id === id);
        return book.name;
    }
    return (  
      <div className="offset-lg-3 col-lg-6"> 
      <div className="card">
      <div className="title">
        <h2 className='MR'>Chapter Details</h2>
      </div>
       <ul className="list-group list-group-flush">
           <li className="list-group-item"><h3>title of chapter : {Data.title}</h3></li>
           <li className="list-group-item"><h3>description is  : {Data.description}</h3></li>
           <li className="list-group-item"><h3>book : {GetBookName(Data.book_id)}</h3></li>
           {/* ! Back button can't be a link u have to make it a function with navigate ! */}
           <li className="list-group-item"><Link to="/Chapter" className="btn btn-primary">Back</Link></li>
      </ul>
      </div>
      </div>

  );

}

export default ChapterRead
