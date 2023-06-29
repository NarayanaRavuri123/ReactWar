import react,{useState,useEffect} from "react"
import axios from "axios";
import {Link} from "react-router-dom";
import Logo from "../img/HealthAsyst.jpg"


function AllDoctors() {
    const [category,setcategory]=useState([]);
    useEffect(()=>{
        const getcategory = async () =>{
            const res= await fetch('https://localhost:7081/api/Admin/DoctorRegistrationget');
            const getdata =await res.json();
            setcategory(getdata);
        }
        getcategory();

    },[]);
    
 const AcceptDoctor= (DoctorId) =>{

  axios.put('https://localhost:7081/api/Admin/AcceptDoctor?DoctorId='+DoctorId+'')
  .then((result)=>{
    alert("Accepted");
  })
  .catch((error)=>{
    alert(error);
  })
 }
 const RejectDoctor = (DoctorId) =>{

  axios.put('https://localhost:7081/api/Admin/RejectDoctor?DoctorId='+DoctorId+'')
  .then((result)=>{
    alert("Rejected");
   
  })
  .catch((error)=>{
    alert(error);
  })
 }
      // <tr key={index}>
      //   <td>{item}</td>
      //   <td><button onClick={e => handleDelete(index,e)}>Delete</button></td>
      // </tr>
    
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
            <li><Link class="nav-link scrollto" to="/AdminPortal">Back</Link></li>
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
            <h2>Pending Doctor Requests</h2>
          </div>
    
    <center>
    <div>
    <table class="table table-bordered">
    <thead>
    <th>FullName</th>
    <th>Email</th>
    <th>Gender</th>
    <th>Qualification</th>
    <th>Specialization</th>
    <th>PhoneNo</th>
    <th>DoctorImage</th>
    <th>DoctorId</th>


    </thead>
    <tbody>
    {
        
        category.map( (getcate) =>(
        <tr>
        <td>{getcate.fullName}</td>
        <td>{getcate.email}</td>
        <td>{getcate.gender}</td>
        <td>{getcate.qualification}</td>
        <td>{getcate.specialization}</td>
        <td>{getcate.phoneNo}</td>
        <td>{getcate.doctorImage}</td>
        <td>{getcate.doctorId}</td>
        <td><button class="btn btn-success" onClick={()=>AcceptDoctor(getcate.doctorId)}>Accept</button></td>
        <td><button class="btn btn-danger" onClick={()=>RejectDoctor(getcate.doctorId)}>Reject</button></td>
        </tr>
       
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
export default AllDoctors;