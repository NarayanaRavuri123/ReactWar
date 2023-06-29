import React, { Fragment, useState,useEffect} from 'react';
import axios from 'axios';
import styles from "../css/HomePage.css"
import {Link} from "react-router-dom";
import Logo from "../img/HealthAsyst.jpg"
 

 

function ModifyAppointment() {
    const [category,setcategory]=useState([]);
    const initialValues = {DoA: "", AppointmentTime: "",doctor:"",department:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
  
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    };
  
  
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    const getcategory = async (Department) =>{
        const res= await fetch('https://localhost:7081/api/Patient/SelectDoctor?Specialization='+Department+'');
        const getdata =await res.json();
        setcategory(getdata);
    }
    const getappointmentslots = async (OurDoctor,DoA) =>{
        const res= await fetch('https://localhost:7081/api/Patient/Slots?OurDoctor='+OurDoctor+'&DoA='+DoA+'');
        const getdata =await res.json();
        setcategory(getdata);
    }
    const HandleModify =() =>{
    const data={
 
        AppointmentId :localStorage.getItem("AppointmentId"),

        DoA: formValues.DoA,

        AppointmentTime : formValues.AppointmentTime,

        OurDoctor:formValues.doctor,

        Department:formValues.department


    };
  
    const url = 'https://localhost:7081/api/Patient/ModifyAppointment';
     
    axios.post(url,data).then((result) =>{

      console.log(data);

        alert(result.data);

      }).catch((error) =>{

        alert(error);

      })
        formValues.DoA = "";
          formValues.AppointmentTime = "";
    };
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
            <li><Link class="nav-link scrollto" to="/ViewStatus">Back</Link></li>

            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
    <section id="hero" class="d-flex align-items-center">
    <div class="container-fluid">
        <section id="appointment_bg" class="appointment section-bg">
        <div class="container">
          <div class="section-title">
            <h2>Modify Appointment </h2>
          </div>
    <Fragment>
    <div>
      <center>
        <div>
        <form onSubmit={handleSubmit}>
        <div className="col-md-2 form-group disabled">
        <input
        type="text"
        name="AppointmentId"
        placeholder="Enter Appointment ID"
        value={localStorage.getItem("AppointmentId")}
        onChange={handleChange}
        />
        </div>
<br/>
<br/>
<div className="col-md-2 form-group">
<label>Department</label>
<select name="department" type="text" className="form-control" id="department" onChange={handleChange}>
<option>Select Department</option>
<option value="Cardiology">Cardiology</option>
<option value="Neurology">Neurology</option>
<option value="Orthopedics">Orthopedics</option>
</select>
<p >{formErrors.department}</p>

</div>
<div className="col-md-2 form-group">
<label>Doctor Name</label>
<select name="doctor"
type="text" 
className="form-control" id="doctor"
placeholder="Enter Doctor Name"
onChange={handleChange}
onClick={()=>getcategory(formValues.department)}>
<option value="">Select Doctor</option>
{
  category.map((getcate)=>(
    <option>{getcate.fullName}</option>
  ))
}
</select>
</div>
<br/>

<label>Select Date of Appointment</label>
<div className="col-md-2 form-group">

        <input
        type="date"
        name="DoA"
        value={formValues.DoA}
        onChange={handleChange}
        />
        <br/>
        <br/>
        </div>

        <div className="col-md-2 form-group">
<label>Slot</label>
                <select type="text" className="form-control" 
                  name="AppointmentTime"  placeholder="Time"
                  onChange={handleChange}
                  onClick={()=>getappointmentslots(formValues.doctor,formValues.doa)}>
                  <option value="">Select Slot</option>
                  {
                  category.map((getcate)=>(
                <option>{getcate.slotTime}</option>
              ))
              }
            </select>
            </div>
            <br/>
        <center><button className={styles.formSubmitBtn} id="contact_button" onClick={HandleModify}>Modify</button></center>
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

 

export default ModifyAppointment;

 
