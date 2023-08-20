import React, { useRef, useState } from "react"; // Import useRef and useState
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa";

const Dropdown = ({ links }) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container $isOpen={isOpen} ref={dropdownRef}>
      <span className="dropdown-title" onClick={toggleDropdown}>
        Browse
        <FaAngleDown className="arrow-icon" />
      </span>
      {isOpen && (
        <ul className="dropdown-links">
          {links.map(({ name, link }) => (
            <li key={name}>
              <Link to={link}>{name}</Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

// ... (Rest of your code)

export default Dropdown;

const Container = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 2rem;
  .dropdown-title {
    color: white;
    cursor: pointer;
  }
  .dropdown-links {
    display: {({$isOpen})=> $isOpen ? "block" : "none"};
    position: absolute;
    top: 100%;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    width: max-content;
    padding: 1rem;
    z-index: 10;

    li {
      margin-bottom: 1rem;
      list-style: none;
      a {
        color: white;
        text-decoration: none;
      }
    }
  }
`;
