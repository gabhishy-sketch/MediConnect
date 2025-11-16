// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom"; // if you use react-router
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="mc-navbar">
      <div className="container nav-inner">
        <div className="nav-left">
          <Link to="/" className="brand-link">
            <div className="logo-pill">MC</div>
            <div className="brand-text">
              <div className="brand-title">MediConnect</div>
              <div className="brand-sub">Healthcare, simplified</div>
            </div>
          </Link>
        </div>

        <nav className="nav-right" aria-label="Main Navigation">
          <Link to="/doctors" className="nav-link">Doctors</Link>
          <Link to="/login" className="nav-link secondary">Login</Link>
          <Link to="/register" className="nav-cta">Register</Link>
        </nav>
      </div>
    </header>
  );
}