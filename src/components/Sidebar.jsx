import { Link } from "react-router-dom";
import styled from "styled-components";

const Sidebar = ({ links }) => {
  return (
    <Container>
      <ul className="sidebar-links">
        {links.map(({ name, link }) => (
          <li key={name}>
            <Link to={link}>{name}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  position: fixed;
  top: 6.5rem;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: black;
  color: white;
  z-index: 3;
  padding: 2rem;
  transition: transform 0.3s ease-in-out;
  transform: translateX(0); /* Initially hidden off-screen */

  .sidebar-links {
    list-style-type: none;
    padding: 0;
    li {
      margin-bottom: 1rem;
      a {
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
        transition: color 0.2s ease-in-out;
        &:hover {
          color: #f34242;
        }
      }
    }
  }
`;
