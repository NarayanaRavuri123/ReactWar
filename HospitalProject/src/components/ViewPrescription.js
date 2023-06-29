import react,{useState,useEffect} from "react"
import axios from "axios";
import {Link} from "react-router-dom";
import Logo from "../img/HealthAsyst.jpg"
import jsPDF from "jspdf";


function ViewPrescription() {
    const [category,setcategory]=useState([]);
        const getcategory = async (AppointmentId) =>{
            const res= await fetch('https://localhost:7081/api/Patient/ViewPrescription?AppointmentId='+AppointmentId+'');
            const getdata =await res.json();
            setcategory(getdata);
    };
    getcategory(localStorage.getItem("AppointmentId"));
   
    const pdfGenerate=(fullName,AppointmentId,DoctorName,Medicine,Dosage,NoofDays)=>{
        var doc=new jsPDF('portrait','px','a4','false');
        doc.addImage(Logo,'jpg',20,20)
        doc.text(180,120,'Prescription')
        doc.text(130,140,'Full Name:')
        doc.text(240,140,fullName)
        doc.text(130,160,'Appointment ID:')
        doc.text(240,160,AppointmentId)
        doc.text(130,180,'Doctor Name:')
        doc.text(240,180,DoctorName)
        doc.text(130,200,'Medicine:')
        doc.text(240,200,Medicine)
        doc.text(130,220,'Dosage:')
        doc.text(240,220,Dosage)
        doc.text(130,240,'No of days:')
        doc.text(240,240,NoofDays)
        doc.save('a.pdf');
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
           
            <li><Link class="nav-link scrollto" to="/PatientPortal">Back</Link></li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
      

    <section id="hero" class="d-flex align-items-center">
    <div class="w-100">
        <section id="appointment_bg" class="appointment section-bg">
        
        <div class="container-fluid">
          <div class="section-title">
            <h2>View Prescription</h2>
          </div>
    
    <center>
    <div>
    <table class="table table-bordered">
      
      
      <tbody>
      {
          
          category.map( (getcate) =>(
            <div>
            <table class="table table-bordered">

            <thead>
            <tr>
            <tr>Full Name : </tr>
            <td>{getcate.fullName}</td>
            </tr>
            <tr>
            <tr>Appointment Id : </tr>
            <td>{getcate.appointmentId}</td>
            </tr>
            <tr>
            <tr>Doctor Name : </tr>
            <td>{getcate.doctorName}</td>
            </tr>
            <tr>
            <tr>Medicine : </tr>
            <td>{getcate.medicine}</td>
            </tr>
            <tr>
            <tr>Dosage :</tr>
            <td>{getcate.dosage}</td>
            </tr>
            <tr>
            <tr>No of Days : </tr>
            <td>{getcate.noofDays}</td>
            </tr>
            </thead>
            </table>
           <td><button class="btn btn-success"  onClick={()=>pdfGenerate(getcate.fullName,getcate.appointmentId,getcate.doctorName,getcate.medicine,getcate.dosage,getcate.noofDays)}>Download Report</button></td> 
            </div>
            
         
     
  )
    )
         
          }
      </tbody>
      </table>
    </div>
    
    </center>
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
export default ViewPrescription;