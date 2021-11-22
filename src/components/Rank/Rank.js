import React from "react";

const Rank = ({ name, count }) => {
  return (
    <div>
      <div className="center white f3">{`${name}, your current entry count is...`}</div>
      <div className="center white f1">#{count}</div>
    </div>
  );
};

export default Rank;
