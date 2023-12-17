import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './CardComponent.css';

import {
  FaBook,
  FaUser,
  FaUserCircle,
  FaUsers,
  FaChartBar,
} from 'react-icons/fa';
import { AiOutlinePullRequest } from 'react-icons/ai';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';

function CardComponent(props) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate(props.linkUrl);
  };

  let icon;
  if (props.icon === 'book') {
    icon = <FaBook />;
  } else if (props.icon === 'user') {
    icon = <FaUser />;
  } else if (props.icon === 'users') {
    icon = <FaUsers />;
  } else if (props.icon === 'profile') {
    icon = <FaUserCircle />;
  } else if (props.icon === 'request') {
    icon = <AiOutlinePullRequest />;
  } else if (props.icon === 'chapter') {
    icon = <BsFillBookmarkCheckFill />;
  } else if (props.icon === 'statistics') {
    icon = <FaChartBar />;
  }

  return (
    <div
      className={`col-sm-6 col-md-4 col-lg-3 mb-4 dash-card animate__animated ${
        isHovered ? 'animate__pulse' : 'animate__fadeIn'
      } d-flex justify-content-center align-items-center`}
    >
      <Card
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'pointer', boxShadow: isHovered ? '0 0 15px rgba(0, 0, 0, 0.3)' : 'none' }}
      >
        <Card.Body>
          <div className="row d-flex align-items-center mb-3">
            <div className="mr-2">{icon}</div>
            <Card.Title className="mb-0">{props.title}</Card.Title>
          </div>
          <Card.Text>{props.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardComponent;
