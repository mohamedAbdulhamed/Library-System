import React from 'react';
import { Link } from 'react-router-dom';

function ReqRead() {

  const staticData = {
    Email: 'example@email.com',
    name: 'Book Name',
    dateOfIssuing: '2023-01-01', 
    dateOfReturn: '2023-01-10', 
  };

  return (
    <div className="container">
      <div className="offset-lg-3 col-lg-6">
        <div className="card">
          <div className="title">
            <h2 className="MR">Request Details</h2>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h3>Email is : {staticData.Email}</h3>
            </li>
            <li className="list-group-item">
              <h3>book name is : {staticData.name}</h3>
            </li>
            <li className="list-group-item">
              <h3>date Of Issuing is : {staticData.dateOfIssuing}</h3>
            </li>
            <li className="list-group-item">
              <h3>date Of Return is : {staticData.dateOfReturn}</h3>
            </li>
            <li className="list-group-item">
              <Link to="/Request" className="btn btn-primary">
                Back
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ReqRead;
