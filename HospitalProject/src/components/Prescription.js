import styles from "../css/HomePage.css"
import Logo from "../img/HealthAsyst.jpg"
import {Link} from "react-router-dom";
import React ,{useState} from "react";
import axios from 'axios';


const Prescription = () => {

  const initialValues = { fullname: "", appointmentId: "",DoctorName: "", medicine: "", dosage: "",noofdays:""};
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


    let flag = 0;
    const validate=(values)=>{
      const errors = {}

      if (!values.fullname) {
        errors.fullname = "Full Name is Required!";
        flag = 1;
    }

    if (!values.appointmentId) {
      errors.appointmentId = "AppointmentId is Required!";
      flag = 1;
    }
    if (!values.DoctorName) {
        errors.DoctorName = "Doctor Name is Required!";
        flag = 1;
    }

    if (!values.medicine) {
        errors.medicine = "Medicine is Required!";
        flag = 1;
      }

      if (!values.dosage) {
        errors.dosage = "Dosage is Required!";
        flag = 1;
      }

      if (!values.noofdays) {
        errors.noofdays = "No of Days is Required!";
        flag = 1;
      }
  
    if (flag === 0) {
       
      const data={
        FullName : formValues.fullname,
        AppointmentId : formValues.appointmentId,
        DoctorName:localStorage.getItem("FullName"),
        Medicine : formValues.medicine,
        Dosage : formValues.dosage,
        NoofDays : formValues.noofdays,
        
    };

    const url = 'https://localhost:7081/api/Provider/Prescription';
    axios.post(url,data).then((result) =>{
        console.log(data);
          alert(result.data);
        }).catch((error) =>{
          alert(error);
        })
      }
      return errors;
    }
   
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
              <li><Link class="nav-link scrollto active" to="/DoctorPortal">Back</Link></li>
             

            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
     
      <section id="hero" class="d-flex align-items-center">
        <div class="container">
        <section id="appointment" class="appointment section-bg">
    <div className='container'>
      <div className='section-title'>
        <h2>Prescription</h2>
      </div>
      <div className="full-form">
        <form className="form">
        
          <div className = "row">
            <div className = "col-md-4 form-group mt-3">
            <label>Fullname</label>
              <input type="text" name="fullname"
                className="form-control" 
                placeholder="Enter Full Name"
                onChange={handleChange}/>
                <p >{formErrors.fullname}</p>

            </div>
    
            <div className="col-md-4 form-group mt-3">

        <label>Doctor Name</label>
        <div></div>
        <input type="text" name="DoctorName"
        className="form-control disabled" 
        placeholder="Enter Your Name"
        value={ localStorage.getItem("FullName")}
        onChange={handleChange}/>
        <p >{formErrors.DoctorName}</p>

          </div>
            <div className="col-md-4 form-group mt-3">

            <label>Appoinment ID</label>

            <input type="text" name="appointmentId"
            className="form-control" 
            placeholder="Enter Appointment ID"
            onChange={handleChange}/>
            <p >{formErrors.appointmentId}</p>

              </div>

             
              <div className="row">
            <div className="col-md-4 form-group mt-3">
            <label>Medicine</label>

              <input name="medicine"
                type="text" 
                className="form-control" 
                placeholder="Enter the Medicine"
                onChange={handleChange}/>
                <p >{formErrors.medicine}</p>

          </div>


          
            <div className="col-md-4 form-group mt-3">
            <label>Dosage</label>

            <input name="dosage"
            type="text" 
            className="form-control" 
            placeholder="Enter Dosage"
            onChange={handleChange}/>
            <p >{formErrors.dosage}</p>

            </div>
   
            <div className="col-md-4 form-group mt-3">
            <label>No of Days</label>

            <input name="noofdays"
            type="text" 
            className="form-control" 
            placeholder="Enter days of dosage"
            onChange={handleChange}/>
            <p >{formErrors.noofdays}</p>

            </div>

          </div>
          
         

          <div>&emsp;</div>
          <div className="text-center"><button className={styles.formSubmitBtn} id="contact_button" onClick={handleSubmit}
          type="submit">Generate Report</button></div>
        </div>
          </form>
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


export default Prescription;
