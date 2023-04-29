import { useEffect, useState } from "react";
import axios from "axios";
import "../style/Home.scss";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:7000/verify")
      .then((res) => {
        if (res.status === 200 && res.data.loggedIn) {
          setLoggedIn(true);
          setUser(res.data.user.user);
        }
      })
      .catch((err) => {
        console.log(err.response.data.devErr);
        setLoggedIn(false);
      });
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to the Library System!</h1>
      <p>
        This is a simple library system where you can keep track of your books.
        You can add new books, mark books as read or unread, and delete books
        from your collection.
      </p>
      <p>
        To get started, select login or sign up the navigation bar above.
      </p>

    </div>
  );
};

export default Home;