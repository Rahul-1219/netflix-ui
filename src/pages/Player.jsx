import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
const Player = () => {
  const navigate = useNavigate();
  const { videoKey } = useParams();
  const opts = {
    height: "450",
    width: "800",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
      </div>
      <div className="youtube">
        <ReactPlayer
          className="react-player"
          url={videoKey ? `https://www.youtube.com/embed/${videoKey}` : ""}
          playing={true}
          controls={true}
          muted={true}
        />
      </div>
    </Container>
  );
};

export default Player;

const Container = styled.div`
  .player {
    width: 10px;
    height: 10px;
  }
  .back {
    position: absolute;
    padding: 2rem;
    z-index: 1;
    svg {
      font-size: 3rem;
      cursor: pointer;
    }
  }

  .youtube {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
`;
