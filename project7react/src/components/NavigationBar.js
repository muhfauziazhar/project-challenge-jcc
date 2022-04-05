import React from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="page-wrapper with-navbar mb-20">
      <nav className="navbar justify-content-between">
        <Link to="/" className="navbar-brand">
          Participant Management
        </Link>
        <ul className="navbar-nav d-md-flex">
          <li className="nav-item">
            <Link to="/list-participant" className="nav-link">
              List Participant
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-participant" className="nav-link">
              Tambah Participant
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
