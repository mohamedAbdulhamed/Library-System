import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/Sidebar';
import sidebar_menu from './constants/sidebar-menu';

import './App.css';

// import PrivateRoutes from './utils/PrivateRoutes';
// Auth
import Login from './login/Login';
import Register from './register/Register';
// Dashboard
import Dashboard from './pages/Dashboard/DashBoard'
// Users
import Users from './pages/manage-user/users';
import User from './pages/manage-user/UserProfile';
import UserCreate from './pages/manage-user/UserCreate';
import UserUpdate from './pages/manage-user/UserUpdate';
// Books
import Booklist from './pages/manage-book/BookList';
import Addbook from './pages/manage-book/AddBook';
import Updatebook from './pages/manage-book/UpdateBook';
import Viewbook from './pages/manage-book/ViewBook';
// Chapters
import Chapter from './pages/Chapter/Chapter';
import ChapterCreate from './pages/Chapter/ChapterCreate';
import ChapterUpdate from './pages/Chapter/ChapterUpdate';
import ChapterRead from './pages/Chapter/ChapterRead';
// Requests
import Requests from './pages/Request/Request';
import Request from './pages/reader-user/Request';
import UpdateRequest from './pages/Request/UpdateRequest';
import ReqCreate from './pages/Request/ReqCreate';
import ReqRead from './pages/Request/ReqRead';

function App () {
  return(
    <Router>
      <div className='dashboard-container'>
        
        
        <div className='dashboard-body'>
          <div className='dashboard-nav'>
            <ul>
              <div className='library'>Grand Library</div>
            </ul>
          </div>
            <Routes>
                {/* Send to auth */}
                <Route path="*" element={<Login/>} />
                <Route exact path="/" element={<Login/>} />
                {/* Auth Routes */}
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/login" element={<Login/>} />
                {/* Sidebar Routes / Private Routes */}
                <Route element={<SideBar menu={sidebar_menu} />}>
                  {/* Dashboard */}
                  <Route exact path="/dashboard" element={<Dashboard/>} />
                  {/* Users Routes */}
                  <Route exact path="/users" element={< Users/>} />
                  <Route exact path="/user/:id" element={<User/>} />
                  <Route exact path="/userCreate" element={<UserCreate/>} />
                  <Route exact path="/userUpdate/:id" element={< UserUpdate/>} />
                  {/* Books Routes */}
                  <Route exact path="/books" element={< Booklist/>} />
                  <Route exact path="/add" element={< Addbook/>} />
                  <Route exact path="/update/:id" element={< Updatebook/>} />
                  <Route exact path="/view/:id" element={< Viewbook/>} />
                  {/* Chapters Routes */}
                  <Route exact path="/Chapter" element={< Chapter/>} />
                  <Route exact path="/ChapterCreate" element={< ChapterCreate/>} />
                  <Route exact path="/ChapterUpdate/:id" element={< ChapterUpdate/>} /> 
                  <Route exact path="/ChapterRead/:id" element={< ChapterRead/>} />
                  {/* Request Routes */}
                  <Route exact path="/requests" element={<Requests/>} />
                  <Route exact path="/ReqCreate" element={<ReqCreate/>} />
                  <Route exact path="/update-request/:id" element={<UpdateRequest/>} />
                  <Route exact path='/ReqRead/:id' element={<ReqRead />}/>
                  <Route exact path="/view/request/:id" element={< Request/>} />
                  {/* Side Pages (About, Privacy, ...) */}
                  {/* <Route exact path="/about" element={<About/>} />
                  <Route exact path="/privacy" element={<Privacy/>} /> */}
                </Route>
            </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;