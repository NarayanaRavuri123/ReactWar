import "../css/HomePage.css"
import Logo from "../img/HealthAsyst.jpg"
import {Link } from "react-router-dom";
import React, { Fragment, useState,useRef } from "react";
import axios from 'axios';


const HomeComponent = () => {

  const initailValues = {fname:'',Lname:'',Email:'',PhoneNo:'',Message:''};
  const[formValues, setFormValues] = useState(initailValues);
  const [formErrors, setFormErrors] = useState({});
  const form=useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };



    let flag = 0;
    const validate=(values)=>{
      const errors = {}
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!values.fname) {
        errors.fname = "Full Name is Required!";
        flag = 1;
      }

      if (!values.Lname) {
        errors.Lname = "Last Name is Required!";
        flag = 1;
      }


      if (!values.Email) {
        errors.Email = "Email is Required!";
        flag = 1;
      }

    else if (!regex.test(values.Email)) {
        errors.Email = "Enter Valid Email Id !";
        flag = 1;
      }

    var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);
    if (!values.PhoneNo) {
        errors.PhoneNo = "Mobile Number is Required!";
        flag = 1;
      }

    else if (!pattern.test(values.PhoneNo)) {
        errors.PhoneNo = "Enter Number only";
        flag = 1;
      }

    else if (values.PhoneNo.length !== 10) {
        errors.PhoneNo = "Enter a Valid Mobile Number";
        flag = 1;
      }
    if (!values.Message) {
        errors.Message = "Message is Required!";
        flag = 1;
      }


      if(flag === 0){
        const data={
          FirstName : formValues.fname,
          LastName : formValues.Lname,
          Email : formValues.Email,
          Phone : formValues.PhoneNo,
          Message : formValues.Message,
      };

        const url = 'https://localhost:7081/api/Admin/ContactUs';
        axios.post(url,data).then((result) =>{
          console.log(data);
            alert(result.data);
          }).catch((error) =>{
            alert(error);
          })  
          formValues.fname = "";
          formValues.Lname = "";
          formValues.Email="";
          formValues.PhoneNo="";
          formValues.Message="";
      }
      return errors;
    }






  return (
    <div>
    <div>
    <div id="topbar" class="d-flex align-items-center fixed-top">
    <div class="container d-flex justify-content-between">
      <div class="contact-info d-flex align-items-center">
        <i ></i> <a href="mailto:contact@example.com">healthasyst@gmail.com</a>
        <i ></i> +1 5589 55488 55
      </div>
      
    </div>
  </div>

    </div>
      <header id="header" class="fixed-top">
        <div class="container d-flex align-items-center">

          <a class="logo me-auto"><img src={Logo} alt="" class="img-fluid" /></a>

          <nav id="navbar" class="navbar order-last order-lg-0">
            <ul>
              <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
              <li><Link class="nav-link scrollto" to="/Aboutus">About Us</Link></li>
              <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
              <li><Link class="nav-link scrollto" to="/Doctors">Doctors</Link></li>
              <li><Link class="nav-link scrollto" to="/Login">Login</Link></li>
              <li><Link class="nav-link scrollto" to="/Register">Register</Link></li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>


        </div>
      </header>
     
      <section id="hero" class="d-flex align-items-center">
        <div class="container">
          <h1>Welcome to HealthAsyst</h1>
          <h2>Empowering People to Improve Their Lives</h2>
          <a href="https://www.youtube.com/watch?v=JANWQ66IuKs" class="btn-get-started scrollto">Get Started</a>
        </div>
      </section>
      
    
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        

        <section id="contact" class="contact">
        <div class="container">
  
          <div class="section-title">
            <h2>Contact</h2>
          </div>
        </div>
        <div class="container">
          <div class="row mt-5">
  
            <div class="col-lg-4">
              <div class="info">
                <div class="address">
                  <h4>Location:</h4>
                  <p>A108 Adam Street, New York, NY 535022</p>
                </div>
  
                <div class="email">
                  <h4>Email:</h4>
                  <p>healthasyst@gmail.com</p>
                </div>
  
                <div class="phone">
                  <h4>Call:</h4>
                  <p>+1 5589 55488 55s</p>
                </div>
  
              </div>
  
            </div>
  
            <div class="col-lg-8 mt-5 mt-lg-0">
  
              <form ref={form} >
                <div class="row">
                  <div class="col-md-6 form-group mt-3">
                    <input type="text" name="fname" class="form-control"  placeholder="First Name" value={formValues.fname}
                    onChange={handleChange}
                    required/>
                    <p style={{color:"red"}}>{formErrors.fname}</p>
                  </div>
                  <div class="col-md-6 form-group mt-3 ">
                    <input type="text" class="form-control" name="Lname" placeholder="Last Name" value={formValues.Lname} onChange={handleChange} required/>
                    <p style={{color:"red"}}>{formErrors.Lname}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 form-group mt-3">
                    <input type="email" name="Email" class="form-control"  placeholder="Email" value={formValues.Email} onChange={handleChange} required/>
                    <p style={{color:"red"}}>{formErrors.Email}</p>
                  </div>
                  <div class="col-md-6 form-group mt-3 ">
                    <input type="number" class="form-control" name="PhoneNo"  placeholder="Phone" value={formValues.PhoneNo} onChange={handleChange} required/>
                    <p style={{color:"red"}}>{formErrors.PhoneNo}</p>
                  </div>
                </div>
                <div class="form-group mt-3">
                  <textarea class="form-control" name="Message" rows="5" placeholder="Message" value={formValues.Message} onChange={handleChange} required></textarea>
                  <p style={{color:"red"}}>{formErrors.Message}</p>
                </div>
               
                <div class="text-center mt-3"><button id="contact_button" onClick={handleSubmit}
                type="submit">Send Message</button></div>
              </form>
  
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
              <li><i class="bx bx-chevron-right"></i> <a href="#hero">Home</a></li>
              <li><i class="bx bx-chevron-right"></i> <Link to="/Aboutus">About us</Link></li>
              <li><i class="bx bx-chevron-right"></i> <a href="#contact">Contact us</a></li>
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

export default HomeComponent;