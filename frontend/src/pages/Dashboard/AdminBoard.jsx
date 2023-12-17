import CardComponent from '../Components/CardComponent';

const AdminBoard=()=>{
	return(
    <div className='row p-3'>
      <div className="row p-3 justify-content-center">
        <CardComponent
          title="Books"
          description="See All Books We Have >"
          linkUrl="/books"
          icon="book"
        />
        <CardComponent
          title="Chapters"
          description="Manage Books Chapters >"
          linkUrl="/chapters"
          icon="chapter"
        />
        <CardComponent
          title={`Users | (${Math.floor(Math.random() * 100)} Users)`}
          description="Manage Users >"
          linkUrl="/users"
          icon="users"
        />

      </div>
      <div className="row p-3 justify-content-center">
        <CardComponent
          title="Requests"
          description="Manage users requests >"
          linkUrl="/requests"
          icon="request"
        />
        <CardComponent
          title="Profile"
          description="Manage your own profile >"
          linkUrl="/profile"
          icon="profile"
        />
        <CardComponent
          title="Statistics"
          description="See how the website is doing >"
          linkUrl="/statistics"
          icon="statistics"
        />
      </div>
    </div>
  )}
export default AdminBoard 