import { useEffect, useState } from "react";
import axios from "axios";
import "../style/Home.scss";
import Bookshelf from "../Components/BookShelf.jsx";

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
        Request books from the library, and check out books that you have
        requested.
      </p>
      <p>
        To get started, select login or sign up in the navigation bar above.
      </p>
      <Bookshelf />
    </div>
  );
};

export default Home;