import React, { Fragment, useState,useEffect} from 'react';
import axios from 'axios';
import styles from "../css/HomePage.css"
import {Link} from "react-router-dom";
import Logo from "../img/HealthAsyst.jpg"
 

 

function DoctorPortal() {

    const Logout =()=> {
        localStorage.removeItem("FullName");
      localStorage.removeItem("Name");
      localStorage.removeItem("Password");
    }

    return (
        <div>
        <div>
        <div id="topbar" class="d-flex align-items-center fixed-top">
        <div class="container d-flex justify-content-between">
          <div class="contact-info d-flex align-items-center">
            <i class="bi bi-envelope"></i> <a href="mailto:contact@example.com">healthasyst@gmail.com</a>
            <i class="bi bi-phone"></i> +1 5589 55488 55
          </div>
          <div class="d-none d-lg-flex social-links align-items-center">
            <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
            <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>
      </div>
    
        </div>
          <header id="header" class="fixed-top">
            <div class="container d-flex align-items-center">
    
              <a class="logo me-auto"><img src={Logo} alt="" class="img-fluid" /></a>
    
              <nav id="navbar" class="navbar order-last order-lg-0">
                <ul>
                <li><Link class="nav-link scrollto active"  to ="/Login" onClick={Logout}>Logout</Link></li>
                </ul>
                <i class="bi bi-list mobile-nav-toggle"></i>
              </nav>
            </div>
          </header>
        <section id="hero" class="d-flex align-items-center">
        <div class="container">
            <section id="appointment_bg" class="appointment section-bg">
            <div class="container">
              <div class="section-title">
                <h2>Welcome</h2>
              </div>
              <div class="container">
              <Link to = "/DoctorAccount" class="appointment-btn scrollto"> My Account</Link><br/><br/>
              <Link to = "/DoctorViewStatus" class="appointment-btn scrollto"> View Appointments</Link><br/><br/>
              <Link to = "/Acceptedapp" class="appointment-btn scrollto"> Accepted Appointments</Link><br/><br/>

          </div>
        </div>
        </section>
        </div>
        </section>
        <br/>
          <br/>
          <br/>
          <br/>
    <footer id="footer">
        <div class="footer-top">
          <div class="container">
            <div class="row">
            <div class="col-lg-5 col-md-6 footer-newsletter">
            <a class="logo me-auto"><img src={Logo} alt="" class="img-fluid" /></a>
            </div>
              <div class="col-lg-4 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                <li><i class="bx bx-chevron-right"></i> <Link to="/">Home</Link></li>
                <li><i class="bx bx-chevron-right"></i> <Link to="/Aboutus">About us</Link></li>
                <li><i class="bx bx-chevron-right"></i> <Link to="/">Contact us</Link></li>
                <li><i class="bx bx-chevron-right"></i> <Link to="/Doctors">Doctors</Link></li>
                </ul>
              </div>
    
              <div class="col-lg-3 col-md-6 footer-contact">
                <h3>HealthAsyst</h3>
                <p>
                  A108 Adam Street </p>
                  <p>New York, NY 535022</p>
                  <p>United States </p>
                 <p> <strong>Phone:</strong> +1 5589 55488 55</p>
                  <p><strong>Email:</strong> healthasyst@gmail.com</p>
                
              </div>
    
             
            </div>
          </div>
        </div>
    
        <div class="container d-md-flex py-4">
    
          <div class="me-md-auto text-center text-md-start">
            <div class="copyright">
              &copy; Copyright <strong><span>HealthAsyst</span></strong>. All Rights Reserved
            </div>
          </div>
         
        </div>
      </footer>
    </div>
    
    
      );
    

}

 

export default DoctorPortal;

 