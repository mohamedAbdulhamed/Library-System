import {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faEnvelope, faPhone, faHome } from "@fortawesome/free-solid-svg-icons";
import "../style/privacy.scss";

const Privacy = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`privacy-container ${isVisible ? "fade-in" : ""}`}>
      <h1><FontAwesomeIcon icon={faLock} /> Privacy Policy</h1>
      <p>We take your privacy seriously. This policy describes what personal information we collect and how we use it.</p>

      <h2><FontAwesomeIcon icon={faUser} /> Information We Collect</h2>
      <p>We may collect the following information:</p>
      <ul>
        <li><FontAwesomeIcon icon={faUser} /> Name</li>
        <li><FontAwesomeIcon icon={faEnvelope} /> Email address</li>
        <li><FontAwesomeIcon icon={faPhone} /> Phone number</li>
        <li><FontAwesomeIcon icon={faHome} /> Mailing address</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Respond to your inquiries</li>
        <li>Process your orders</li>
        <li>Provide customer service</li>
        <li>Send periodic emails</li>
      </ul>

      <h2>Cookies</h2>
      <p>We use cookies to:</p>
      <ul>
        <li>Keep track of advertisements</li>
        <li>Compile aggregate data about site traffic and site interactions</li>
        <li>Improve our website</li>
      </ul>

      <h2>Information Sharing and Disclosure</h2>
      <p>We do not sell, trade, or rent your personal information to others. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep the information confidential and secure.</p>

      <h2>Security</h2>
      <p>We implement a variety of security measures to maintain the safety of your personal information.</p>

      <h2>Changes to Our Privacy Policy</h2>
      <p>If we decide to change our privacy policy, we will post those changes on this page.</p>

    </div>
  );
};

export default Privacy;