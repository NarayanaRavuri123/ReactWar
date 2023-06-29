import React from 'react';
import d1 from "../img/Doc1.png";
import d2 from "../img/Doc2.png";
import d3 from "../img/Doc3.png";
import Logo from "../img/HealthAsyst.jpg"
import {Link} from "react-router-dom";



const Doclist = () => { 
    return(
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
            <li><Link class="nav-link scrollto active" to="/">Home</Link></li>
            <li><Link class="nav-link scrollto" to="/Login">Login</Link></li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
    <section id="hero" class="d-flex align-items-center">
    <div class="container">
    <div class="row">
    <div class="col-md-4">
      <div class="img-thumbnail">
          <img src={d1} alt="Lights"/>
          <div class="caption">
            <h4>Dileep Choudhary</h4>
            <h5>Surgeon</h5>
          <h5>Department : Orthopedics</h5>
          </div>
        
      </div>
    </div>
    <div class="col-md-4">
      <div class="img-thumbnail">
          <img src={d2} alt="Nature"/>
          <div class="caption">
          <h4>Rahul Kumar</h4>
          <h5>Surgeon</h5>
          <h5>Department : Neurology</h5>
          </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="img-thumbnail">
          <img src={d3} alt="Fjords"/>
          <div class="caption">
          <h4>Manasa Murali</h4>
          <h5>Surgeon</h5>
          <h5>Department : Cardiology</h5>
          </div>
      </div>
    </div>
  </div>
  </div>
      </section>
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

export default Doclist;


