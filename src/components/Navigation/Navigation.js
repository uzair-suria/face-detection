import React from "react";
import Logo from "../Logo/Logo";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <div
      className="flex justify-between"
      style={{ background: "rgba(255, 255, 255, 0)" }}
    >
      <Logo />
      {isSignedIn ? (
        <nav>
          <p
            className="f6 link dim ph3 pv2 ma0 pointer"
            onClick={() => onRouteChange("signout")}
          >
            Sign out
          </p>
        </nav>
      ) : (
        <nav className="flex justify-end">
          <p
            className="f6 link dim ph3 pv2 ma0 pointer"
            onClick={() => onRouteChange("signin")}
          >
            Sign In
          </p>
          <p
            className="f6 link dim ph3 pv2 ma0 pointer"
            onClick={() => onRouteChange("register")}
          >
            Register
          </p>
        </nav>
      )}
    </div>
  );
};

export default Navigation;
