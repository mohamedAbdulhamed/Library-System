import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import './Chapter.css'
import { Link, useNavigate } from 'react-router-dom'
const Chapter = () => {
    const [chapters, setChapters] = useState([])
    const [books, setBooks] = useState([{
        id: '',
        name: ''
    }])
    const navigate = useNavigate()
    useEffect(()=> {
        axios.get('http://localhost:7000/get-chapters/')
        .then(res => setChapters(res.data))
        .catch(err => console.log(err))

        axios.get('http://localhost:7000/get-books/')
        .then(res => setBooks(res.data))
        .catch(err => console.log(err))
    }, [])

    function GetBookName(id) {
        let book = books.find(book => book.id === id);
        return book.name;
    }
  return (
    <div className="container"style={{margin: 'auto',
    margineft: '-68px'}}>
            <h2 className='MR'>Manage Chapters</h2>
        
            <div className="create_btn">
                  <Link to="/ChapterCreate" className='btn btn-primary'>Create +</Link>
            </div>
            <table className="table ">
                <thead > 
                    <tr>
                        <th >Title</th>
                        <th >Description</th>
                        <th >Book</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {chapters.map((chapter, i)=> (
                            <tr key={i}>
                                <td className='chtitle'>{chapter.title}</td>
                                <td>{chapter.description}</td>
                                <td className='book'>{GetBookName(chapter.book_id)}</td>
                                <td className='action'>
                                    <Link className='button btn btn-success' to={`/ChapterUpdate/${chapter.id}`}>Update</Link> 
                                    <button className='btn btn-danger button'onClick={e=>handleDelete(chapter.id)}><span></span></button>
                                    <Link className='button btn btn-primary' to={`/ChapterRead/${chapter.id}`}>Read</Link>  
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
    
</div>
  )
  function handleDelete(id) {
    const confirm = window.confirm("Are you sure you want to delete this chapter?");
    if(confirm) {
        axios.delete('http://localhost:7000/delete-chapter/'+id)
        .then(res => {
            alert(res.data.msg);
            window.location.reload();
        })
    }
  }
}

export default Chapter