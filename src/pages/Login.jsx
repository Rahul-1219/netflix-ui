import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
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
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <form>
          <div className="form-container flex column a-center j-center">
            <div className="form flex column a-center j-center">
              <div className="title">
                <h3>Login</h3>
              </div>
              <div className="container flex column">
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
                  autoComplete="username"
                />
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
                <button type="button" onClick={handleLogIn}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default memo(Login);

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
    .form-container {
      gap: 2rem;
      height: 85vh;
    }
    .form {
      padding: 2rem;
      background-color: #000000b0;
      width: 25vw;
      gap: 2rem;
      color: white;
      h3 {
        font-size: 1.5rem;
      }
      .container {
        gap: 2rem;
        input {
          padding: 0.5rem 1rem;
          width: 15rem;
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
      }
    }
  }
  @media ((min-width: 1101px) and (max-width: 1320px)) {
    .content {
      .form {
        width: 30vw;
      }
    }
  }
  @media ((min-width: 970px) and (max-width: 1100px)) {
    .content {
      .form {
        width: 35vw;
      }
    }
  }
  @media ((min-width: 820px) and (max-width: 969px)) {
    .content {
      .form {
        width: 40vw;
      }
    }
  }
  @media ((min-width: 710px) and (max-width: 819px)) {
    .content {
      .form {
        width: 45vw;
      }
    }
  }
  @media ((min-width: 655px) and (max-width: 709px)) {
    .content {
      .form {
        width: 50vw;
      }
    }
  }
  @media ((min-width: 481px) and (max-width: 655px)) {
    .content {
      .form {
        width: 60vw;
      }
    }
  }
  @media ((min-width: 300px) and (max-width: 480px)) {
    .content {
      .form {
        width: 80vw;
      }
    }
  }
`;
