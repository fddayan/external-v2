import React from "react";

const Anchor: React.FC<{ name: string }> = ({ name }) => {
  return <div id={name} />;
};

export default Anchor;
