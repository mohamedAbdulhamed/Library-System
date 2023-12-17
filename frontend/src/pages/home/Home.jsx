import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faArrowUp, faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Components/Loader.jsx";
import BookShelf from "../Components/BookShelf.jsx";
import "../style/Home.scss";
import anime from "animejs/lib/anime.es.js"

const Home = () => {
    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [landing, setLanding] = useState();
    const [countdown, setCountdown] = useState({
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    });
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // scroll-to-top
    useEffect(() => {
      const handleScroll = () => {
        // Show the scroll-to-top button when the user scrolls down
        setShowScrollToTop(window.scrollY > 100);
      };

      window.addEventListener("scroll", handleScroll);

      // Clean up the event listener
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);


    // Setting user - Landing animation
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        setLanding(document.querySelector(".landing .container"));

        if (landing) {
            for (let i = 0; i < 20; i++) {
                const block = document.createElement("div");
                block.classList.add("block");
                landing.appendChild(block);
            
                anime({
                    targets: block,
                    translateX: anime.random(-700, 700),
                    translateY: anime.random(-500, 500),
                    scale: anime.random(1, 5),
                    duration: 1000,
                    easing: 'easeInOutQuad',
                    delay: 1,
                });
            }
        }
  
        return () => clearTimeout(timer);
    }, [loading, landing]);
  
    // Countdown timer
    useEffect(() => {
      const countDownDate = new Date("May 15, 2024 23:59:59").getTime();
  
      const counter = setInterval(() => {
        const dateNow = new Date().getTime();
        const dateDiff = countDownDate - dateNow;
  
        const days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);
  
        setCountdown({
          days: days < 10 ? `0${days}` : days.toString(),
          hours: hours < 10 ? `0${hours}` : hours.toString(),
          minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
          seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
        });
  
        if (dateDiff < 0) {
          clearInterval(counter);
        }
      }, 1000);
  
      return () => clearInterval(counter);
    }, []);

    
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
    };

    const submit = (e) => {
        e.preventDefault();
        alert(`Thank you for subscribing, ${email}!`);
        setEmail("");
    };
    

    if (loading) {
      return <Loader />;
    }

    return (
        <>
            {/* Start Scroll to Top button */}
            {showScrollToTop && (
                <div className="scroll-to-top" onClick={scrollToTop}>
                <FontAwesomeIcon icon={faArrowUp} />
                </div>
            )}
            {/* End Scroll to Top button */}
            
            {/* Start Landing */}
            <div className="landing">
                <div className="container" style={{ backgroundColor: 'transparent'}}>
                    <div className="text">
                        <h1>Welcome, To The Grand Library</h1>
                        <p>Explore a vast collection of books, immerse yourself in captivating stories, and embark on intellectual adventures. Whether you seek wisdom, inspiration, or simply a moment of escape, our library is here to ignite your imagination. Discover the power of words and let the pages transport you to new worlds.</p>
                    </div>
                    <div className="image">
                        <img src="https://cdn-icons-png.flaticon.com/128/3771/3771417.png" alt="landing" />
                    </div>
                </div>
                <a href="#articles" className="go-down">
                    <FontAwesomeIcon icon={faAnglesDown} />
                </a>
            </div>
            {/* End Landing */}
            {/* Start Articles */}
            <div className="articles" id="articles">
                <h2 className="main-title">Popular</h2>
                <div className="container">
                    <div className="box">
                        <img src="https://m.media-amazon.com/images/I/51E2EiqPtLS._SY466_.jpg" style={{ width: '300px', height: '300px' }} alt="" />
                        <div className="content">
                            <h3>Control Systems Engineering</h3>
                            <p>Control Systems Engineering: International Student Version ,Ed. :6 by Norman S. </p>
                        </div>
                        <div className="info">
                            <a href="/books/book/1">Raed More</a>
                            <FontAwesomeIcon icon={faLongArrowAltRight} />
                        </div>
                    </div>
                    <div className="box">
                        <img src="https://m.media-amazon.com/images/I/51cctlaBofL._SY445_SX342_.jpg" style={{ width: '300px', height: '300px' }} alt="" />
                        <div className="content">
                            <h3>Edexcel International GCSE Maths Student Book</h3>
                            <p>Ensure top marks and complete coverage for the  2 GCSE in Mathematics</p>
                        </div>
                        <div className="info">
                            <a href="/books/book/1">Raed More</a>
                            <FontAwesomeIcon icon={faLongArrowAltRight} />
                        </div>
                    </div>
                    <div className="box">
                        <img src="https://m.media-amazon.com/images/I/81E5wTJvPeL._SY466_.jpg" style={{ width: '300px', height: '300px' }} alt="" />
                        <div className="content">
                            <h3>The Classic Car Book</h3>
                            <p>With more than 1300 colour photographs of the key classic cars from every decade since the 1940s to the 1980s.</p>
                        </div>
                        <div className="info">
                            <a href="/books/book/1">Raed More</a>
                            <FontAwesomeIcon icon={faLongArrowAltRight} />
                        </div>
                    </div>
                    <div className="box">
                        <img src="https://m.media-amazon.com/images/I/51T7Qt1ShHL._SY445_SX342_.jpg" style={{ width: '300px', height: '300px' }} alt="" />
                        <div className="content">
                            <h3>Logic and Computer Design Fundamentals</h3>
                            <p> Understanding Logic and Computer Design for All Audiences Logic and Computer Design Fundamentals</p>
                        </div>
                        <div className="info">
                            <a href="/books/book/2">Raed More</a>
                            <FontAwesomeIcon icon={faLongArrowAltRight} />
                        </div>
                    </div>
                </div>
            </div>
            {/* End Articles */}
            {/* Start Gallery */}
            <div className="gallery" id="gallery">
                <h2 className="main-title">Selection</h2>
                <div className="container">
                    <div className="box">
                        <div className="image">
                            <img src="https://m.media-amazon.com/images/I/812eE1lO0dL._SY466_.jpg" style={{ width: '300px', height: '300px' }} alt="" />
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img src="https://m.media-amazon.com/images/I/51wUrk90tkL._SX342_SY445_.jpg" style={{ width: '300px', height: '300px' }} alt="" />
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img src="https://m.media-amazon.com/images/I/71zSWZN3ieL._AC_SY879_.jpg" style={{ width: '300px', height: '300px' }} alt="" />
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img src="https://m.media-amazon.com/images/I/51iLOEhdY+L._SX342_SY445_.jpg" style={{ width: '300px', height: '300px' }} alt="" />
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img src="https://m.media-amazon.com/images/I/41tN4MmnvPL._SX342_SY445_.jpg" style={{ width: '300px', height: '300px' }} alt="" />
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                            <img src="https://m.media-amazon.com/images/I/51SGiLpUilL._SX342_SY445_.jpg" style={{ width: '300px', height: '300px' }} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            {/* End Gallery */}
            {/* Start Features */}
            <div className="features" id="features">
                <h2 className="main-title">Features</h2>
                <div className="container">
                    <div className="box quality">
                        <div className="img-holder">
                            <img src="images/features-01.jpg" alt="" />
                        </div>
                        <h2>Quality</h2>
                        <p>Lorem ipsum <span className="dolor">dolor</span> sit amet consectetur adipisicing elit. <span className="nemo">Nemo</span> aperiam eaque, perferendis omnis libero ad <span className="aliquid">aliquid</span>. Mollitia perspiciatis ipsum magnam. Quaerat sint repellat unde, voluptate voluptatem animi soluta a ducimus!</p>
                        <a href="/books/book/3">More</a>
                    </div>
                    <div className="box time">
                        <div className="img-holder">
                            <img src="images/features-02.jpg" alt="" />
                        </div>
                        <h2>Time</h2>
                        <p>Lorem ipsum <span className="dolor">dolor</span> sit amet consectetur adipisicing elit. <span className="nemo">Nemo</span> aperiam eaque, perferendis omnis libero ad <span className="aliquid">aliquid</span>. Mollitia perspiciatis ipsum magnam. Quaerat sint repellat unde, voluptate voluptatem animi soluta a ducimus!</p>
                        <a href="/books/book/5">More</a>
                    </div>
                    <div className="box passion">
                        <div className="img-holder">
                            <img src="images/features-03.jpg" alt="" />
                        </div>
                        <h2>Passion</h2>
                        <p>Lorem ipsum <span className="dolor">dolor</span> sit amet consectetur adipisicing elit. <span className="nemo">Nemo</span> aperiam eaque, perferendis omnis libero ad <span className="aliquid">aliquid</span>. Mollitia perspiciatis ipsum magnam. Quaerat sint repellat unde, voluptate voluptatem animi soluta a ducimus!</p>
                        <a href="/books/book/6">More</a>
                    </div>
                </div>
            </div>
            {/* End Features */}
            {/* Start Events */}
            <div className="events" id="events">
                <h2 className="main-title">Latest Events</h2>
                <div className="container">
                    <div className="info">
                        <div className="time">
                            <div className="unit">
                                <span className="days">{countdown.days}</span>
                                <span>Days</span>
                            </div>
                            <div className="unit">
                                <span className="hours">{countdown.hours}</span>
                                <span>Hours</span>
                            </div>
                            <div className="unit">
                                <span className="minutes">{countdown.minutes}</span>
                                <span>Minuits</span>
                            </div>
                            <div className="unit">
                                <span className="seconds">{countdown.seconds}</span>
                                <span>Seconds</span>
                            </div>
                        </div>
                        <h2 className="title">Black Friday 2023</h2>
                        <p className="description">New Collection of Books Soon, stay tuned!</p>
                    </div>
                    <div className="subscribe">
                        <form id="subscribe">
                            <input type="email" placeholder="Enter Your Email..." value={user ? user.email : ""} onChange={(e) => setEmail(e.target.value)} />
                            <input type="submit" value="subscribe" onClick={submit} />
                        </form>
                    </div>
                </div>
            </div>
            {/* End Events */}
            {/* Start BookShelf */}
            <div className="shelf" id="shelf">
                <h2 className="main-title">BookShelf</h2>
                <div className="container">
                    <BookShelf />
                </div>
            </div>
            {/* End BookShelf */}
        </>
    );
};

export default Home;
