import "../css/HomePage.css"
import Logo from "../img/HealthAsyst.jpg"
import {Link} from "react-router-dom";

const Aboutus =()=>{
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
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
                <section id="hero" class="d-flex align-items-center">
                <div class="container">
                    <section id="why-us" class="why-us">
                    <div class="container">
                      <div class="section-title">
                        <h2>About Us</h2>
                      </div>
                <div class="row">
                  <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="content">
                      <h3>About HealthAsyst</h3>
                      <p>
                      Health Asyst is one of India's foremost multi-speciality healthcare providers catering to both Indian and international patients. We are a leader in the areas of education and healthcare. With a group of 27 hospitals spread in 15 cities, we are the
                      second largest hospital chain in India. To manage such a large network of hospitals, we have different entities that ensure proper functioning, smooth operations and
                     overall patient satisfaction.
                      </p>
                      <div class="text-center">
                        <a href="https://www.youtube.com/watch?v=SVGb98h20Kw" class="more-btn">Learn More <i class="bx bx-chevron-right"></i></a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-8 d-flex align-items-stretch">
                    <div class="icon-boxes d-flex flex-column justify-content-center">
                      <div class="row">
                        <div class="col-xl-6 d-flex align-items-stretch">
                          <div class="icon-box mt-4 mt-xl-0">
                            <i class="bx bx-receipt"></i>
                            <h4>Our Vision</h4>
                            <p>"To provide compassionate, accessible, high quality, cost effective healthcare to one all. To serve with a patient's first motto and
                            to work towards a patient- centered care. To develop, share and apply new knowledge and technology in the delivery of patient care
                            through research and technology integration"</p>
                          </div>
                        </div>
                        <div class="col-xl-6 d-flex align-items-stretch">
                          <div class="icon-box mt-4 mt-xl-0">
                            <i class="bx bx-cube-alt"></i>
                            <h4>Our Mission</h4>
                            <p>“To inspire hope and contribute to health and well-being by providing the best care to every patient through integrated clinical practice, education and research.”</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
              <li><i class="bx bx-chevron-right"></i> <a href="#why-us">About us</a></li>
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


export default Aboutus ;
