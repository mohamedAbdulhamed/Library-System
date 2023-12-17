import React from "react";
import "../style/about.scss";
import "../style/about.css";
import Slideshow from "./Slideshow";


const About = () => {

    return (
        <div className="about-container">
            <div className="hero">
                <h1>Welcome to Our Library Dashboard</h1>
                <p>Explore a vast collection of e-books available for free download.</p>
            </div>
            <div className="content">
                <p>
                    Our Library Dashboard is designed to provide users with easy access to a wide range of e-books. Whether you're a student, a researcher, or simply someone who loves reading, our platform is your gateway to a world of knowledge.
                </p>
                <p>
                    Discover and download e-books covering various genres and subjects. Our library is constantly growing, ensuring that you have access to the latest and most diverse collection of digital books.
                </p>
                <p>
                    At our library, we believe in the power of knowledge and the importance of making it accessible to everyone. All our books are available for free, and users can request a download with a simple click.
                </p>
                <p>
                    Join us on this literary journey and make the most of the resources our Library Dashboard has to offer. Happy reading!
                </p>
            </div>

            {/* Team */}
            <div className="container">
                <div className="main-title">Our Team</div>
                <h2 className="ref-header">
                    <span>اتقلو</span>
                    <span>الامتيازات</span>
                    <span>مسألة وقت</span>
                </h2>

                {/* make each 3 in a row*/}
                <div className="team-container container">
                    <Slideshow 
                        slides={[
                            {
                                name: "Salma Magdy",
                                role: "Developer",
                                imageUrl: "https://www.cyberark.com/wp-content/uploads/2019/11/Developer.jpg",
                            },
                            {
                                name: "Rahma Hesham",
                                role: "Designer",
                                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGrcm_S5zxSjrZ02xc9Vfdu4kXivX4wGEXFA&usqp=CAU",
                            },
                            {
                                name: "Shrouk Hussein",
                                role: "Developer",
                                imageUrl: "https://www.cyberark.com/wp-content/uploads/2019/11/Developer.jpg",
                            },
                            {
                                name: "Shrouk Waleed",
                                role: "Designer",
                                imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGrcm_S5zxSjrZ02xc9Vfdu4kXivX4wGEXFA&usqp=CAU",
                            },
                            {
                                name: "Mohamed Abo-Zeid",
                                role: "Developer",
                                imageUrl: "https://www.cyberark.com/wp-content/uploads/2019/11/Developer.jpg",
                            },
                            {
                                name: "Mohamed Magdy",
                                role: "العبد لله",
                                imageUrl: "data:image/jpeg;base64,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",
                            }
                        ]}
                    />
                </div>
            </div>


        </div>
    );
};

export default About;
