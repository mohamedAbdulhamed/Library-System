import React from 'react';
import '../style/SidePages.scss'

const Privacy = () => {
  return (
    <div>
      <h1>Privacy Policy</h1>
      <p>We take your privacy seriously. This policy describes what personal information we collect and how we use it.</p>
      <h2>Information We Collect</h2>
      <p>We may collect the following information:</p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Mailing address</li>
      </ul>
      <h2>How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Respond to your inquiries</li>
        <li>Process your orders</li>
        <li>Provide customer service</li>
        <li>Send periodic emails</li>
      </ul>
      <p>We do not sell, trade, or rent your personal information to others. We may release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights, property, or safety.</p>
    </div>
  );
};

export default Privacy;