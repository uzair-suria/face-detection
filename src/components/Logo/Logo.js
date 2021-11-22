import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";

const Logo = () => (
  <div className="ma4 mt0">
    <Tilt
      perspective={100}
      transitionSpeed={100}
      // tiltMaxAngleX={10}
      // tiltMaxAngleY={10}
      className="br2 shadow-2 frosted-glass logo"
      style={{
        height: "50px",
        width: "50px",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
      }}
    >
      <img
        style={{
          transformOrigin: "center",
          paddingTop: "5px",
          paddingLeft: "5px",
        }}
        src={brain}
        alt="AI Logo"
        width="40px"
      />
    </Tilt>
  </div>
);

export default Logo;
