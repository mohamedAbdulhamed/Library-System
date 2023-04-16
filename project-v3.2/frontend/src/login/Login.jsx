import React,{useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Login.css';


const Login=()=>{
	axios.defaults.withCredentials = true;
	const navigate = useNavigate();

	const {msg} = useLocation();
	if (msg) alert(msg);
	const [inputData,setInputData]=useState({
		email:'',
		password:''
	});
		
	useEffect(() => {
		axios.get('http://localhost:7000/verify')
		.then(res=> {if (res.data.loggedIn) navigate('/dashboard')})
		.catch(err=> alert("Error occured!"))
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		axios.post('http://localhost:7000/login',inputData)
    .then(res=>{
			if (res.data.Status === "Success"){
				navigate('/dashboard');
			} else{
				alert(res.data.msg);
			}
    })
    .catch(err=>{
			console.log(err)
			alert("Error occured!");
    })
	}


	return(
		<div className="container">
		<div className="screen">
			<div className="screen__content main">
				<form className="login form1" action="" onSubmit={handleSubmit}>
					<div className="login__field">
						<i className="login__icon fas fa-user"></i>
						<input type="text" className="login__input un" placeholder="Email" name="email" id="email" required onChange={(e)=>setInputData({...inputData,email:e.target.value})}/> 
					</div>
					<div className="login__field">
						<i className="login__icon fas fa-lock"></i>
						<input type="password" className="login__input pass" placeholder="Password" name="password" id="password" required onChange={(e)=>setInputData({...inputData,password:e.target.value})}/> 
					</div>
					<button className="login__submit">
						<span className="button__text submit">Log In Now</span>
						<i className="button__icon fas fa-chevron-right"></i>
					</button>		
						
				</form>
			</div>
			<div className="screen__background">
				<span className="screen__background__shape screen__background__shape4"></span>
				<span className="screen__background__shape screen__background__shape3"></span>		
				<span className="screen__background__shape screen__background__shape2"></span>
				<span className="screen__background__shape screen__background__shape1"></span>
			</div>		
		</div>
	</div>
)} 
export default Login 