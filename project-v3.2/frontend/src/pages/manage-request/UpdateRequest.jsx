import axios from 'axios';
import React from 'react'
import { useEffect , useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Request.css';
const UpdateRequest = () => {
    const {id} = useParams();
    const [request, setRequest] = useState({})
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])      
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:7000/get-request/'+id)
            .then(res => {
                console.log(res.data)
                // if request is empty, then show no request found
                if (res.data === 'Cannot Find Request!') {
                    alert(res.data)
                    navigate('/requests')
                } else {
                    setRequest(res.data[0])
                }
            })
            .catch(err => {
                console.log("Error in get-request")
                console.log(err)
            })

            // if request found then there have to be books and users so no need to check
            await axios.get('http://localhost:7000/get-books/')
            .then(res => setBooks(res.data))
            .catch(err => console.log(err))

            await axios.get('http://localhost:7000/get-users/')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))

            fetchData();
        }
    },[id])

    function GetBookName(id) {
        let book = books.find(book => book.id === id);
        return book.name;
    }
    function GetUserName(id) {
        let user = users.find(user => user.id === id);
        return user.name;
    }
    function GetStatus(status) {
        if (status === 1)
            return 'Accepted'
        return 'Declined'
    }
    function AcceptButton(status, id) {
        if (status === -1) {
            return <button className='text-decoration-none btn btn-sm btn-primary' onClick={e => handleAccept(id)}>Accept</button>
        }
    }
    function DeclineButton(status, id) {
        if (status === 1) {
            return <button className='text-decoration-none btn btn-sm btn-danger' onClick={e => handleDecline(id)}>Decline</button>
        }
    }

    return ( 
        <div className="container">
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
                        <tr>
                            {/* Make the name a link to the user profile */}
                            <td>{GetUserName(request.user_id)}</td>
                            <td>{GetBookName(request.book_id)}</td>
                            <td>{GetStatus(request.status)}</td>
                            <td>
                            {AcceptButton(request.status, request.id)}
                            {DeclineButton(request.status, request.id)}
                        </td>
                    
                    </tr>
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

export default UpdateRequest