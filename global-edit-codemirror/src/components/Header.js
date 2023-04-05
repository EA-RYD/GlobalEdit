import React from "react";
import "./Header.css";

const Header = () => {

  return (
    <div className="header">
        <div className="namelogo">
            <p className="names">GlobalEdit</p>
        </div>
        <div className="button">
            <a target="_blank" href="https://github.com/EA-RYD/GlobalEdit">
            <button className="source">
                Source Code <i class="fi fi-brands-github"></i>
            </button>
            </a>
        </div>
    </div>
  );
};

export default Header;