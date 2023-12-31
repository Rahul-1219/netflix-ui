import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { searchMovies } from "../store/index";
import Dropdown from "./Dropdown";

const Navbar = ({ isScrolled, type, inputIsChanged }) => {
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(
    window.innerWidth <= 1180 || false
  );
  const [inputHover, setInputHover] = useState(
    window.innerWidth <= 1180 || false
  );
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
  }, [navigate]);

  const handleSearch = (e) => {
    const searchStr = e.target.value;
    dispatch(searchMovies({ searchStr, type }));
  };

  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="logo" />
            <Dropdown links={links} />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                window.innerWidth >= 1180 && setShowSearch(false);
              }}
              onChange={handleSearch}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
        .dropdown-title {
          display: none;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          svg {
            color: white;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
  @media (max-width: 1180px) {
    nav {
      .left {
        .brand {
          gap: 1rem;
          .dropdown-title {
            display: inline-block;
          }
        }
        .right {
          .search {
            display: none;
          }
        }
        .links {
          display: none;
        }
      }
    }
  }
  @media ((min-width: 320px) and (max-width: 767px)) {
    nav {
      padding: 0 1rem; /* Adjust the padding for smaller screens */
      height: 5rem; /* Reduce the height for smaller screens */
      .left {
        gap: 1rem;
        .brand {
          img {
            height: 3rem; /* Reduce the logo height for smaller screens */
          }
          .dropdown-title {
            font-size: 1rem; /* Adjust the font size for the dropdown title */
            text-align: center;
          }
        }
        .links {
          display: none;
        }
      }
      .right {
        gap: 0.7rem;
        .search {
          padding: 0.2rem;
          padding-left: 0.3rem;
          button {
            svg {
              font-size: 1rem; /* Adjust the icon size for smaller screens */
            }
          }
          input {
            padding: 0.1rem; /* Adjust the padding for the input field */
          }
        }
      }
    }
  }
`;
