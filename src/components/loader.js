import React from "react";

const loaderStyleOuter = {
  position: "fixed",
  zIndex: 100,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: 0,
};

const loaderStyleInner = {
  content: " ",
  display: "block",
  background: 0,
  borderRadius: "50%",
  width: "48px",
  height: "48px",
  margin: 0,
  boxSizing: "border-box",
  border: "2px solid #fff",
  borderColor: "#373d49 transparent #373d49 transparent",
};

export default function Loader() {
  return (
    <div className=" flex   animate-spin" style={loaderStyleOuter}>
      <div className="spinner" style={loaderStyleInner}></div>
    </div>
  );
}


const spinnerStyle = (white) => ({
  content: " ",
  display: "block",
  background: 0,
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  margin: 0,
  boxSizing: "border-box",
  border: "2px solid #fff",
  borderColor: !white
    ? "#3B82F6 transparent #3B82F6 transparent"
    : "white transparent white transparent",
});

function Spinner({ white = false , className }) {
  return (
    <div
      className={`animate-spin flex Loader justify-center ${className}`}
      style={{padding: "2px"}}
    >
      <div className="spinner" style={spinnerStyle(white)}></div>
    </div>
  );
}

export {Spinner};