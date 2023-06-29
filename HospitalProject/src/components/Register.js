import React, { Fragment, useState } from 'react';
import axios from 'axios';
import styles from "../css/HomePage.css"
import {Link} from "react-router-dom";
import Logo from "../img/HealthAsyst.jpg"
 

 

function Registration() {

  const initialValues = { username: "", email: "", gender: "", mobileno: "",password:"",confirmpassword:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});


  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
      console.log(formValues);
  };


  const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
  };

  const res={}
  let flag = 0;
  const validate = (values) => {

      const errors = {}
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      const regName = /^[A-Za-z]+([\ A-Za-z]+)$/i;
      if (!values.username) {
                errors.username = "Full Name is Required!";
                flag = 1;
            }
            if(!regName.test(values.username))
            {
              errors.username = "Full Name is incorrect!";
                flag = 1;
            }



      // if (!values.username) {
      //     errors.username = "Full Name is Required!";
      //     flag = 1;
      // }

      if (!values.email) {
          errors.email = "Email is Required!";
          flag = 1;
      }


      else if (!regex.test(values.email)) {
          errors.email = "Enter Valid Email Id !";
          flag = 1;
      }

      if (!values.gender) {
          errors.gender = "Gender is Required!";
          flag = 1;
      }


      var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);

      if (!values.mobileno) {
          errors.mobileno = "Mobile Number is Required!";
          flag = 1;
      }

      else if (!pattern.test(values.mobileno)) {
          errors.mobileno = "Enter Number only";
          flag = 1;
      }

      else if (values.mobileno.length !== 10) {
          errors.mobileno = "Enter a Valid Mobile Number";
          flag = 1;
      }
      
      if(!values.password) {
        errors.password="Password is required";
        flag=1;
      }

      else if(values.password.length < 8)
      {
        errors.password ="Password must have exact 8 characters";
        flag=1;

      }

      else if(values.password.length > 8)
      {
        errors.password="Password must have exact 8 characters";
        flag=1;
      }
      else if (!values.password.match(/[a-z]/g)) {
        errors.password =  "Please enter at least lower character.";
        flag=1;

      } 
      else if (!values.password.match(/[A-Z]/g)) {
        errors.password =  "Please enter at least upper character.";
        flag=1;

    } 
    else if (!values.password.match(/[0-9]/g)) {
        errors.password=  "Please enter at least one digit.";
        flag=1;

      }

      if (values.password != values.confirmpassword) {
        errors.password=  "Password mismatch";
        flag=1;
      }



      if(!values.Address)
      {
          errors.Address ="Address cannot be Empty";
      }
      if (flag === 0) {
          const data={
 
              FullName :formValues.username,
     
              Email: formValues.email,
     
              Gender : formValues.gender,
     
              PhoneNo :  formValues.mobileno,

              PatientAddress:formValues.Address,

              password:formValues.password

          };
          const url = 'https://localhost:7081/api/Patient/patientregistration';
     
          axios.post(url,data).then((result) =>{
     
            console.log(data);
     
              alert(result.data);
     
            }).catch((error) =>{
     
              alert(error);
     
            })
            formValues.username = "";
          formValues.email = "";
          formValues.gender="";
          formValues.mobileno="";
          formValues.Address="";
          formValues.password="";
          formValues.confirmpassword="";

      }
      return errors;

     

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
            <li><Link class="nav-link scrollto active" to="/">Home</Link></li>
            <li><Link class="nav-link scrollto" to="/Login">Login</Link></li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
      <br/>
      <br/>

      <br/>

      <br/>
      <br/>

      <br/>

    <section id="hero" class="d-flex align-items-center">
    <div class="container">
        <section id="appointment_bg" class="appointment section-bg">
        <div class="container">
          <div class="section-title">
            <h2>Patient Register</h2>
          </div>
    <Fragment>
    <div>
      <center>
        <div>
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        name="username"
        placeholder="Enter Full Name"
        value={formValues.username}
        onChange={handleChange}
        />
        <p style={{color:"red"}} id="ptrgerr">{formErrors.username}</p>
        <br/>
       
      <input
      type="email"
      placeholder="Enter Email ID"
      name="email" value={formValues.email}
       onChange={handleChange}
      />
      <p style={{color:"red"}} id="ptrgerr">{formErrors.email}</p>
      <br/>
  
      <input
      type={"number"}
      name="mobileno" 
      placeholder="Enter Phone Number" 
      value={formValues.mobileno}
      onChange={handleChange}/>
      <p style={{color:"red"}} id="ptrgerr">{formErrors.mobileno}</p>
      <br/>
  
      <input
      type={"text"}
      name="gender"
      placeholder="Enter Gender" 
      value={formValues.gender}
      onChange={handleChange}
      />
      <p style={{color:"red"}} id="ptrgerr">{formErrors.gender}</p>
      <br/>
      <input
      type={"text"}
      name="Address"
      placeholder="Enter Address"
      value={formValues.Address}
      onChange={handleChange}
      />
      <p style={{color:"red"}} id="ptrgerr">{formErrors.Address}</p>
      <br/>
      <input type="password" name="password" placeholder="Password" value={formValues.password}
                    onChange={handleChange} />
            <p style={{color:"red"}}>{formErrors.password}</p>
            <br/>

            
            <input type="password" name="confirmpassword" placeholder="Confirm password" value={formValues.confirmpassword}
            onChange={handleChange} />
    <p style={{color:"red"}}>{formErrors.password}</p>
    <br/>
      <center><button className={styles.formSubmitBtn} id="contact_button">REGISTER</button></center>
      <br/>
      <Link to='/DoctorRegister'>Register as Doctor</Link>

      </form>

        </div>

      </center>

    </div>

    </Fragment>
    </div>
    </section>
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

 

export default Registration;

 