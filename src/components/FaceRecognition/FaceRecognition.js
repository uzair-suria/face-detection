import React from "react";

import "./FaceRecognition.css";

const Facerecognition = ({ imageUrl, box }) => {
  return (
    <div className="center">
      <div className="container">
        <img
          className="ma3 shadow-5"
          src={imageUrl}
          alt=""
          style={{ zIndex: 100 }}
          width="300px"
          height="auto"
          id="inputImage"
        />

        {Object.values(box).length !== 0 && (
          <div
            className="box"
            style={{
              position: "absolute",
              top: box.top,
              right: box.right,
              bottom: box.bottom,
              left: box.left,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Facerecognition;
