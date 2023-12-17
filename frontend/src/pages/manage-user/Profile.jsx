import React, {useState, useEffect} from 'react'
import ProfileCard from '../Components/ProfileComponent';
import '../style/profile.css'

const Profile = () => {
  const [user, setUser] = useState({});
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));

    const staticRequests = [
      {
        book_id: 1,
        status: 1,
      },
      {
        book_id: 2,
        status: 0,
      },
      {
        book_id: 3,
        status: -1,
      },
    ];
    setRequests(staticRequests);

  }, []);


  return (
    <div className="profile-container">
      <ProfileCard
        name={user.name}
        email={user.email}
        type={user.role}
        requests={requests}
      />
    </div>
  );
}                              

export default Profile