import React from "react";
import "./ImageLinkForm.css";

const Imagelinkform = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="f3 center">
        {"This AI will detect faces in your pictures. Give it a try!"}
      </p>
      <div className="center form pa4 shadow-5">
        <div className="center">
          <input
            type="text"
            name="input"
            className="f4 pa2 w-70 ma1"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple ma1 bw0"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Imagelinkform;
