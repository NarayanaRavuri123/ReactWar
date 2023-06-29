import React, { Fragment, useState } from 'react';

import axios from 'axios';
import styles from "../css/HomePage.css"
import {Link} from "react-router-dom";
import Logo from "../img/HealthAsyst.jpg"
 

 

function DocRegistration() {

  const initialValues = { fullName: "", email: "", gender: "", mobileno: "",qualification:"",specialization:"",password:"",confirmpassword:"",uploadImage:""};
  const[upload,setupload]=useState();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
 
  const [file,setFile]  = useState();
  const[fileName,setFileName]=useState();


  const saveFile = (e) => {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
  }
 
 

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
      console.log(formValues);
  };


  const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
  };
  const uploadFile = async (e) =>{
      console.log(file);
      const formData = new FormData();
      formData.append("formFile",file);
      formData.append("fileName",fileName);
      try{
          const res = await axios.post("https://localhost:7081/api/Provider/DoctorImage",formData)
          setupload(res.data);
          console.log(res);
      }catch(ex){
          console.log(ex);
      }
  }

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



      // if (!values.fullName) {
      //     errors.fullName = "Full Name is Required!";
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
      if(!values.qualification){
              errors.qualification = "Qualification should not be empty"
                   flag = 1;
                  }
      if(!values.specialization){
          errors.specialization = "Specialization should not be empty"
                  flag = 1;
      }

     
     
      if (flag === 0) {
          const data1= {
              DoctorImage:fileName,
              FullName: formValues.fullName,
              Email: formValues.email,
              Gender: formValues.gender,
              Qualification:formValues.qualification,
              Specialization:formValues.specialization,
              PhoneNo:formValues.mobileno,
              password:formValues.password,

             
          }
          const url='https://localhost:7081/api/Provider/DoctorRegistration';
          axios.post(url,data1).then((result)=>{
            alert(result.data);
          }).catch((error)=>{
          alert(error);
        })
        formValues.fullName = "";
        formValues.email = "";
        formValues.gender="";
        formValues.qualification="";
        formValues.specialization="";
        formValues.mobileno="";
        formValues.password="";
        formValues.confirmpassword="";
        formValues.uploadImage="";

      };
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
              <li><Link class="nav-link scrollto active" to="/Register">Back</Link></li>
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
      


    <section id="hero" class="d-flex align-items-center">
    <br/>
    <br/>
    
    <br/>
    <br/>
    
    <br/>
   
    
    <br/>
    <div class="container">
        <section id="appointment_bg" class="appointment section-bg">
        <br/>
        <br/>
        <br/>
      
        <br/>
        <br/>
        <div class="container">
        
          <div class="section-title">
            <h2>Doctor Registration</h2>
          </div>
    <Fragment>
    <div>
      <center>
        <div>
        <form  onSubmit={handleSubmit}>
        <div className="formfield"  >
            <input type="text" placeholder="Enter fullname" name="fullName"  value={formValues.fullName} onChange={handleChange}/>
            <p style={{color:"red"}}>{formErrors.fullName}</p>
            <br/>
            
            <input type="text" placeholder="Enter the email"  name="email"  value={formValues.email} onChange={handleChange} />
            <p style={{color:"red"}}>{formErrors.email}</p>
            <br/>
            

                <input type="text" name="gender" placeholder="Gender" value={formValues.gender}
                    onChange={handleChange} />
            
            <p style={{color:"red"}} >{formErrors.gender}</p>
            
      <br/>
            <input type="text" name="qualification" placeholder="Qualification" value={formValues.qualification}
                onChange={handleChange} />
            
            <p style={{color:"red"}} >{formErrors.qualification}</p>
            
      <br/>
            <input type="text" name="specialization" placeholder="Specialization" value={formValues.specialization}
                onChange={handleChange} />
            <p style={{color:"red"}}>{formErrors.specialization}</p>
            <br/>
            
                <input type="number" name="mobileno" placeholder="Mobile Number" value={formValues.mobileno}
                    onChange={handleChange} />
            <p style={{color:"red"}}>{formErrors.mobileno}</p>
            <br/>

            <input type="password" name="password" placeholder="Password" value={formValues.password}
                    onChange={handleChange} />
            <p style={{color:"red"}}>{formErrors.password}</p>
            <br/>

            <input type="password" name="confirmpassword" placeholder="Confirm password" value={formValues.confirmpassword}
            onChange={handleChange} />
            <p style={{color:"red"}}>{formErrors.password}</p>
    
    
            
            <input type="file" name = "uploadImage" onChange={saveFile}/>
            
          
             <center><button className={styles.formSubmitBtn} id="contact_button" value="upload" onClick={uploadFile}>REGISTER</button></center>
        </div>


    </form>

        </div>

      </center>

    </div>

    </Fragment>
    </div>
    <br/>
      
    <br/>
    <br/>
    <br/>
      
    <br/>
    <br/>
    
    <br/>
    </section>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    
    <br/>
    </section>
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
              <p><strong>Email:</strong>healthasyst@gmail.com</p>
            
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

 

export default DocRegistration;

 