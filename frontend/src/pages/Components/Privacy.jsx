import {useEffect, useState} from "react";
import "../style/privacy.scss";

const Privacy = () => {
  console.error("Not yet implemented")
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`privacy-container ${isVisible ? "fade-in" : ""}`}>
      

    </div>
  );
};

export default Privacy;