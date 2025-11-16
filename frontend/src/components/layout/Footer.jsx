// Footer.jsx
import React from "react";
import './Footer.css';

export default function Footer(){
  return (
    <footer className="mc-footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="logo-pill small">MC</div>
          <div style={{marginLeft:12}}>
            <div style={{fontWeight:700}}>MediConnect</div>
            <div className="small" style={{color:'var(--text-muted)'}}>Connecting patients & providers</div>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-col">
            <div className="footer-title">Product</div>
            <a href="/doctors">Find Doctors</a>
            <a href="/appointments">Appointments</a>
          </div>

          <div className="footer-col">
            <div className="footer-title">Company</div>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>

          <div className="footer-col">
            <div className="footer-title">Support</div>
            <a href="/help">Help center</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </div>
      <div style={{textAlign:'center', padding:'14px 0', color:'var(--text-muted)', borderTop:'1px solid rgba(16,24,40,0.03)'}}>
        © {new Date().getFullYear()} MediConnect • All rights reserved
      </div>
    </footer>
  );
}