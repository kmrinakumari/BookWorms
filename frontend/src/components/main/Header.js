import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        {/* Container wrapper */}
        <div className="container">
          {/* Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          {/* Collapsible wrapper */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Navbar brand */}
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <img
                src="main-logo.png"
                height={50}
                alt="Book Logo"
                loading="lazy"
              />
            </a>
            {/* Left links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/main/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/main/aboutus">
                  AboutUs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/main/browse">
                  Browse Novels
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/main/aboutus">
                  ContactUs
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item me-2">
                <NavLink className="btn btn-outline-white" to="/main/signup">
                  Create Account
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="btn btn-outline-white" to="/main/login">
                  Signin
                </NavLink>
              </li>
            </ul>
            {/* Left links */}
          </div>
          {/* Collapsible wrapper */}
        </div>
        {/* Container wrapper */}
      </nav>
      {/* Navbar */}
    </>
  );
};

export default Header;
