import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {
    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        password: '',
        phone: null
    });
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('User created successfully!');
        navigate('/users');
    };

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form onSubmit={handleSubmit} className="container">
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="form-label">Name</label>
                                            <input type="text" className="form-control" onChange={e => setInputData({ ...inputData, name: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" aria-describedby="emailHelp" onChange={e => setInputData({ ...inputData, email: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" onChange={e => setInputData({ ...inputData, password: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="tel" className="form-control" onChange={e => setInputData({ ...inputData, phone: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                            <button type="button" className="btn btn-danger" onClick={() => navigate('/users')}>Back</button>
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
};

export default UserCreate;
