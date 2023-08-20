import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  }, [navigate]);

  return (
    <Container $showpassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <form>
          <div className="body flex column a-center j-center">
            <div className="text flex column">
              <h1>Unlimited movies, TV shows and more</h1>
              <h4>Watch anywhere. Cancel anytime.</h4>
              <h6>
                Ready to watch? Enter your Email to create or restart membership
              </h6>
            </div>
            <div className="form">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                autoComplete="email"
              />
              {showPassword && (
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [e.target.name]: e.target.value,
                    })
                  }
                  autoComplete="current-password"
                />
              )}
              {!showPassword && (
                <button type="button" onClick={() => setShowPassword(true)}>
                  Get Started
                </button>
              )}
            </div>
            <button type="button" onClick={handleSignIn}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default memo(Signup);

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
  }
  .body {
    gap: 1.5rem;
    .text {
      gap: 1rem;
      text-align: center;
      font-size: 2rem;
      margin-top: 2rem;
    }
    h1 {
      padding: 2rem 10rem;
    }
  }
  .form {
    display: grid;

    grid-template-columns: ${({ $showpassword }) =>
      $showpassword ? "1fr 1fr" : "2fr 1fr"};

    width: 60%;
    input {
      color: black;
      border: none;
      padding: 1.5rem;
      font-size: 1.2rem;
      border: 1px solid black;
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #e50914;
      border: none;
      cursor: pointer;
      color: white;
      font-weight: bolder;
      font-size: 1.05rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }

  @media ((min-width: 1025px ) and (max-width: 1200px)) {
    .body {
      h1 {
        padding: 1rem 5rem;
        font-size: 3.2rem;
      }
    }
    .form {
      width: 70%;
    }
  }
  @media ((min-width: 777px) and (max-width: 1024px)) {
    .body {
      h1 {
        padding: 1rem 2rem;
        font-size: 3rem;
      }
    }
    .form {
      width: 70%;
    }
  }
  @media ((min-width: 671px) and (max-width: 776px)) {
    .body {
      h1 {
        padding: 1rem 2rem;
        font-size: 2.8rem;
      }
      h4 {
        font-size: 1.5rem;
      }
      h6 {
        font-size: 1.2rem;
        word-wrap: break-word;
      }
    }
    .form {
      display: inline-block;
      width: 60%;
      text-align: center;
      input {
        width: 100%;
        margin-bottom: 0.2rem;
        height: 3.5rem;
      }
      button {
        width: 100%;
        margin-top: 0.2rem;
        height: 3.5rem;
      }
    }
  }
  @media ((min-width: 481px) and (max-width: 670px)) {
    .body {
      h1 {
        padding: 1rem 2rem;
        font-size: 2.5rem;
      }
      h4 {
        font-size: 1.5rem;
      }
      h6 {
        font-size: 1.2rem;
        word-wrap: break-word;
      }
    }
    .form {
      display: inline-block;
      width: 60%;
      text-align: center;
      input {
        width: 100%;
        margin-bottom: 0.2rem;
        height: 3.5rem;
      }
      button {
        width: 100%;
        margin-top: 0.2rem;
        height: 3.5rem;
      }
    }
  }
  @media ((min-width: 320px) and (max-width: 480px)) {
    .body {
      h1 {
        padding: 1rem 2rem;
        font-size: 2.5rem;
      }
      h4 {
        font-size: 1.3rem;
      }
      h6 {
        font-size: 1rem;
        word-wrap: break-word;
      }
    }
    .form {
      display: inline-block;
      width: 60%;
      text-align: center;
      input {
        width: 100%;
        margin-bottom: 0.2rem;
        height: 3.5rem;
      }
      button {
        width: 100%;
        margin-top: 0.2rem;
        height: 3.5rem;
      }
    }
  }
`;
