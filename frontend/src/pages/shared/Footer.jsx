import React from 'react';
import '../style/Footer.scss'

const Footer = () => {
  
  return (
    <footer className="footer bg-dark text-white">
      <div className="container">  
        <div className="row">
          <div className="col-md-12">
            <p className="text-muted small">Copyright &copy; LMS&nbsp; 
            {new Date().getFullYear()}</p>
            <p className='text-muted'>Sometimes evolution just needs a little push. And here at Grand Library, we push hard!</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;