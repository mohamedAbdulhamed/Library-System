import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import './Request.css'
import { Link, useNavigate } from 'react-router-dom'

const Request = () => {
    // userid, bookid, status
    const [requests, setRequests] = useState([])
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])
    const navigate = useNavigate()
    // ! Don't forget: make useEffect run first(async) before functions(GetBookName, GetUserName, ...) run !
    // ! filter requests by status first pending then accepted,declined !
    useEffect(()=> {
        axios.defaults.withCredentials = true;
        async function Effect() {
            await axios.get('http://localhost:7000/get-requests/')
            .then(res => {if (res.data === 'No Requests Found!') {alert(res.data); navigate('/dashboard')} else setRequests(res.data)})
            .catch(err => console.log(err))
            
            // if requests found then there have to be books and users so no need to check
            await axios.get('http://localhost:7000/get-books/')
            .then(res => setBooks(res.data))
            .catch(err => console.log(err))

            await axios.get('http://localhost:7000/get-users/')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
        }
        Effect();
    }, [])

    function GetBookName(id) {
        let book = books.find(book => book.id === id);
        return book.name;
    }

    function GetUserName(id) {
        let user = users.find(user => user.id === id);
        return user.name;
    }

    function GetStatus(status) {
        if (status === 0) {
            return 'Pending'
        } else if (status === 1) {
            return 'Accepted'
        } else if (status === -1) {
            return 'Declined'
        }
    }

    function ControlButtons(status, id) {
        if (status === 0) {
            return (
                <>
                    <button className='text-decoration-none btn btn-sm btn-primary' onClick={e => handleAccept(id)}>Accept</button>
                    <button className='text-decoration-none btn btn-sm btn-danger' onClick={e => handleDecline(id)}>Decline</button>
                </>
            )
        }
    }
    function UpdateButton(status, id) {
        if (status !== 0) {
            return <Link className='text-decoration-none btn btn-sm btn-success' to={`/update-request/${id}`}>Update</Link>
        }
    }


  return (
    <div className="container">
        <h2 className='MR' style={{marginBottom: '449px'}}>Manage Request</h2>
        
            <div className="Btn" style={{marginBottom: '374px'}}>
                  <Link to="/ReqCreate" className='btn btn-primary'>Create +</Link>
            </div>
            <table className="table" style={{marginLeft:'-285px'}}>
                <thead > 
                    <tr>
                        <th >User</th>
                        <th >Book</th>
                        <th >Status</th>
                        <th >action</th>
                    </tr>
                </thead>
                <tbody>

                    {requests.map((request, i)=> (
                             <tr key={i}>
                                 {/* ! Make the name a link to the user profile ! */}
                                 <td>{GetUserName(request.user_id)}</td>
                                 <td>{GetBookName(request.book_id)}</td>
                                 <td>{GetStatus(request.status)}</td>
                                 <td>
                                    {ControlButtons(request.status, request.id)}
                                    {UpdateButton(request.status, request.id)}
                                </td>
                         
                            </tr>
                        ))
                    }

                </tbody>

            </table>
        
</div>
  )
  function handleAccept(id){
    axios.post('http://localhost:7000/accept-request/' + id)
    .then(res => {
        alert(res.data.msg);
        window.location.reload();
    })
    .catch(err => console.log(err))
  }
  function handleDecline(id){
    axios.post('http://localhost:7000/reject-request/' + id)
    .then(res => {
        alert(res.data.msg);
        window.location.reload();
    })
    .catch(err => console.log(err))
  }
}

export default Request