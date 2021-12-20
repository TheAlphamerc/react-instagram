import React from 'react';

const loaderStyle = {
    position: "fixed",
    zIndex: 100,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: 0
}

const spinnerStyle = {
    content: " ",
    display: "block",
    background: 0,
    borderRadius: "50%",
    width: "48px",
    height: "48px",
    margin: 0,
    boxSizing: "border-box",
    border: "2px solid #fff",
    borderColor: "#373d49 transparent #373d49 transparent"
}

export default function Loader() {
    return <div className="Loader animate-spin" style={loaderStyle}>
        <div className="spinner" style={spinnerStyle}></div>
    </div>
}