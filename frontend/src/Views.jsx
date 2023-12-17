import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home.jsx';
// Auth
import PrivateRoute from './Auth/PrivateRoute';
import Login from './login/Login';
import Register from './register/Register';
// Dashboard
import Dashboard from './pages/Dashboard/DashBoard'
// Users
import Users from './pages/manage-user/users';
import UserCreate from './pages/manage-user/UserCreate';
import UserUpdate from './pages/manage-user/UserUpdate';
import Profile from './pages/manage-user/Profile';
// Books
import Booklist from './pages/manage-book/BookList';
import Addbook from './pages/manage-book/AddBook';
import Updatebook from './pages/manage-book/UpdateBook';
import Viewbook from './pages/manage-book/ViewBook';
// Chapters
import Chapter from './pages/manage-chapter/Chapter';
import ChapterCreate from './pages/manage-chapter/ChapterCreate';
import ChapterUpdate from './pages/manage-chapter/ChapterUpdate';
import ChapterRead from './pages/manage-chapter/ChapterRead';
// Requests
import Requests from './pages/manage-request/Request';
import UpdateRequest from './pages/manage-request/UpdateRequest';
import ReqCreate from './pages/manage-request/ReqCreate';
import ReqRead from './pages/manage-request/ReqRead';
import UserRequests from './pages/manage-request/UserRequests';
// Privacy, About
import About from './pages/Components/About.jsx'
import Privacy from './pages/Components/Privacy.jsx'
// Statistics
import Statistics from './pages/Components/Statistics.jsx'
// 404
import NotFound from './pages/shared/NotFound.jsx';


const Views = () => {
  return (
    <Routes>
        {/* Home Route */}
        <Route exact path="/" element={<Home/>} />
        {/* Auth Routes */}
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        {/* Verify user logged in */}
        <Route element={<PrivateRoute />} >
            {/* Dashboard */}
            <Route exact path="/dashboard" element={<Dashboard/>} />
            {/* Users Routes */}
            <Route exact path="/users" element={< Users/>} />
            <Route exact path="/users/create" element={<UserCreate/>} />
            <Route exact path="/users/update/:id" element={< UserUpdate/>} />
            <Route exact path="/profile" element={< Profile/>} />
            {/* Books Routes */}
            <Route exact path="/books" element={< Booklist/>} />
            <Route exact path="/books/create" element={< Addbook/>} />
            <Route exact path="/books/update/:id" element={< Updatebook/>} />
            <Route exact path="/books/book/:id" element={< Viewbook/>} />
            {/* Chapters Routes */}
            <Route exact path="/chapters" element={< Chapter/>} />
            <Route exact path="/chapters/create" element={< ChapterCreate/>} />
            <Route exact path="/chapters/update/:id" element={< ChapterUpdate/>} /> 
            <Route exact path="/chapters/view/:id" element={< ChapterRead/>} />
            {/* Request Routes */}
            <Route exact path="/user_requests" element={<UserRequests/>} />
            <Route exact path="/requests" element={<Requests/>} />
            <Route exact path="/requests/create" element={<ReqCreate/>} />
            <Route exact path="/requests/update/:id" element={<UpdateRequest/>} />
            <Route exact path='/requests/view/:id' element={<ReqRead />}/>
            {/* Statistics */}
            <Route exact path="/statistics" element={<Statistics/>} />
        </Route>
        {/* / Verify user logged in */}
        {/* Privacy, About Routes */}
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/privacy" element={<Privacy/>} />
        {/* Catch-all route for 404 page */}
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Views;
