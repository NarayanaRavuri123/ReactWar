import styles from "../css/HomePage.css"
import Logo from "../img/HealthAsyst.jpg"
import {Link} from "react-router-dom";
import React ,{useState} from "react";
import axios from 'axios';


const Appointment = () => {
  const [category,setcategory]=useState([]);
  const initialValues = { fullname: "", gender: "", dob: "", doctor: "",department:"",doa:"",address:"",email:"",mobile:"",message:"",AppointmentTime:""};
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
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      if (!values.fullname) {
        errors.fullname = "Full Name is Required!";
        flag = 1;
    }

    if(!values.gender) {
      errors.gender = "Gender is Required!";
      flag = 1;
    }

    if(!values.dob) {
      errors.dob = "Date of Birth is Required!";
      flag = 1;
    }

    if(!values.doctor) {
      errors.doctor = "Doctor Name is Required!";
      flag = 1;
    }

    if(!values.department) {
      errors.department = "Department is Required!";
      flag = 1;
    }

    if(!values.doa) {
      errors.doa = "Date of Appointment is Required!";
      flag = 1;
    }

    if(!values.address) {
      errors.address = "Address is Required!";
      flag = 1;
    }

    if (!values.email) {
      errors.email = "Email is Required!";
      flag = 1;
    }
    else if (!regex.test(values.email)) {
      errors.email = "Enter Valid Email Id !";
      flag = 1;
    }
 
    var pattern = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i);

      if (!values.mobile) {
          errors.mobile = "Mobile Number is Required!";
          flag = 1;
      }

      else if (!pattern.test(values.mobile)) {
          errors.mobile = "Enter Number only";
          flag = 1;
      }

      else if (values.mobile.length !== 10) {
          errors.mobile = "Enter a Valid Mobile Number";
          flag = 1;
      }

   
    if(!values.message) {
      errors.message = "Message is Required!";
      flag = 1;
    }

    if (flag === 0) {
       
      const data={
        FullName : formValues.fullname,
        Gender : formValues.gender,
        Dob : formValues.dob,
        OurDoctor : formValues.doctor,
        Department : formValues.department,
        DoA : formValues.doa,
        Address : formValues.address,
        Email : formValues.email,
        PhoneNo : formValues.mobile,
        AnyMessage : formValues.message,
        AppointmentTime:formValues.AppointmentTime
    };

    const url = 'https://localhost:7081/api/Patient/appointment';
    axios.post(url,data).then((result) =>{
        console.log(data);
          alert(result.data);
        }).catch((error) =>{
          alert(error);
        })
        formValues.fullname="";
        formValues.gender = "";
          formValues.dob = "";
          formValues.doctor="";
          formValues.department="";
          formValues.doa="";
          formValues.address="";
          formValues.email="";
          formValues.mobile="";
          formValues.message="";
          formValues.AppointmentTime="";
      }
      return errors;
    }

    const getcategory = async (Department) =>{
      const res= await fetch('https://localhost:7081/api/Patient/SelectDoctor?Specialization='+Department+'');
      const getdata =await res.json();
      setcategory(getdata);
  }

  // const getappointmentslots = (OurDoctor,DoA) =>{
  //   axios.put('https://localhost:7081/api/Patient/Slots?OurDoctor='+OurDoctor+'&DoA='+DoA+'')
  //   .then((result)=>{
     
  //   })
  //   .catch((error)=>{
  //     alert(error);
  //   })
  //  }
  const getappointmentslots = async (OurDoctor,DoA) =>{
    const res= await fetch('https://localhost:7081/api/Patient/Slots?OurDoctor='+OurDoctor+'&DoA='+DoA+'');
    const getdata =await res.json();
    setcategory(getdata);
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
              <li><Link class="nav-link scrollto active" to="/PatientPortal">Back</Link></li>

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
        <h2>Make an Appointment</h2>
        <p>Book your appointment by filling this form.</p>
      </div>
      <div className="full-form">
        <form className="form">
          <div className = "row">
            <div className = "col-md-4 form-group mt-3">
            <label>Fullname</label>
              <input type="text" name="fullname"
                className="form-control" 
                placeholder="Enter Full Name"
                onChange={handleChange}
                value={formValues.fullname}/>
                <p style={{color:"red"}} >{formErrors.fullname}</p>

            </div>

            <div className="col-md-4 form-group mt-3">
            <label>Gender</label>

            <input type="text" name="gender"
            className="form-control" 
            placeholder="Enter Gender"
            onChange={handleChange}
            value={formValues.gender}/>
            <p style={{color:"red"}} >{formErrors.gender}</p>

              </div>

            <div className="col-md-4 form-group mt-3">
            <label>Date of Birth</label>

              <input name="dob"
                type="date" 
                className="form-control" id="DOB"
                placeholder="DD/MM/YYYY"
                onChange={handleChange}
                value={formValues.dob}/>
                <p style={{color:"red"}}>{formErrors.dob}</p>

          </div>

          <div>&emsp;</div>

          <div className="row">
           

            <div className="col-md-4 form-group mt-3 mt-md-0">
            <label>Department</label>
            <select name="department" type="text" className="form-control" id="department" onChange={handleChange} value={formValues.department}>
            <option>Select Department</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedic">Orthopedic</option>
            </select>
            <p style={{color:"red"}}>{formErrors.department}</p>

            </div>

            <div className="col-md-4 form-group">
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
            <p style={{color:"red"}} >{formErrors.doctor}</p>

            </div>

            <div className="col-md-4 form-group mt-3 mt-md-0">
            <label>Date of Appoinment</label>

              <input type="date"
                name="doa" 
                className="form-control datepicker" id="date"
                placeholder=" Date of Appointment in DD/MM/YYYY"
                onChange={handleChange} value={formValues.doa}/>
                <p style={{color:"red"}}>{formErrors.doa}</p>

            </div>

          </div>
          <div className="row">
            <div className="col-md-4 form-group mt-3">
            <label>Residential Address</label>

              <input type="text" name="address" 
                className="form-control" placeholder="Residential Address"
                onChange={handleChange} value={formValues.address}/>
                <p style={{color:"red"}} >{formErrors.address}</p>

            </div>

            <div className="col-md-4 form-group mt-3">
            <label>Email</label>

              <input type="email" name="email"
                className="form-control" 
                placeholder="rameshraik@gmail.com"
                onChange={handleChange} value={formValues.email}/>
                <p  style={{color:"red"}}>{formErrors.email}</p>

            </div>

            <div className="col-md-4 form-group mt-3">
            <label>Phone Number</label>

              <input type="number" className="form-control"
                name="mobile" id="numb" 
                placeholder="Enter a 10 digit valid number"
                onChange={handleChange} value={formValues.mobile}/>
                <p style={{color:"red"}}>{formErrors.mobile}</p>
            </div>

          </div>
          <div className = "row">
          <div className=" col-md-4 form-group mt-3">
          <label>Reason of visit</label>

            <input type="text" className="form-control" 
              name="message"  placeholder="Reason of visit"
              onChange={handleChange} value={formValues.message}/>
              <p style={{color:"red"}}>{formErrors.message}</p>
            </div>
              <div className=" col-md-4 form-group mt-3">
              <label>Appoinment Time</label>
                <select type="text" className="form-control" 
                  name="AppointmentTime"  placeholder="Time"
                  onChange={handleChange} value={formValues.AppointmentTime}
                  onClick={()=>getappointmentslots(formValues.doctor,formValues.doa)}>
                  <option value="">Select Slot</option>
                  {
                  category.map((getcate)=>(
                <option>{getcate.slotTime}</option>
              ))
              }
            </select>
          </div>
          </div>

          <div>&emsp;</div>
          <div className="text-center"><button className={styles.formSubmitBtn} id="contact_button" onClick={handleSubmit}
          type="submit">Send Request</button></div>
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


export default Appointment;
