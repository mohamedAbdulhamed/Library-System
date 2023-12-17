// NotFound.jsx
import '../style/NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound">
      <div className='container'>
        <h1 className=''>We lost this page</h1>
        <p className='text-muted '>We searched high and low but couldn't find what you're looking for.Let's find a better place for you to go.</p>
        <a href='/' className='btn btn-primary'>Go to Home</a>
      </div>
    </div>
  );
}

export default NotFound;
