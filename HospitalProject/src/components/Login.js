import React, { Fragment, useState} from 'react';
import axios from 'axios';
import styles from "../css/HomePage.css"
import { Link, useNavigate,navigate } from "react-router-dom";
import Logo from "../img/HealthAsyst.jpg";



function LoginForm() {
    const initialValues = { Name: "", Password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    
   
    const handleLogin = () => {

        const data = {
            AdminUserName: formValues.Name,
            Adminpassword: formValues.Password,
        };
        const url = 'https://localhost:7081/api/Admin/login';
        axios.post(url, data).then((result) => {
            alert(result.data);
            if(result.data == "Valid"){
                navigate('/AdminPortal');
            }
         

            
        })
        .catch((error) => {
            alert(error);
        })
        
          
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
                            <li><Link class="nav-link scrollto" to="/Register">Register</Link></li>
                        </ul>
                        <i class="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                </div>
            </header>
            <section id="hero" class="d-flex align-items-center">
                <div class="container">
                    <section id="appointment_bg" class="appointment section-bg">
                        <div class="container">
                            <div class="section-title">
                                <h2>Admin Login</h2>
                            </div>
                            <Fragment>
                                <div>
                                    <center>
                                        <div>
                                            <form className='log' onSubmit={handleSubmit}>
                                                <input
                                                    type="text"
                                                    name="Name"
                                                    value={formValues.Name}
                                                    placeholder="User Name"
                                                    onChange={handleChange}
                                                /><br /><br />

                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    name="Password"
                                                    value={formValues.Password}
                                                    onChange={handleChange}
                                                /><br /><br />

                                                <Link to='/ResetPassword' id='Resetpassword'>Reset password?</Link><br /><br />

                                                <button type="submit" id="contact_button" onClick={handleLogin}>Login</button>
                                                <br /><br />

                                                <Link to='/PatientLogin'>Login as Patient </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <Link to='/DoctorLogin'>Login as Doctor</Link>

                                            </form>
                                        </div>
                                    </center>
                                </div>
                            </Fragment>
                        </div>
                    </section>
                </div>
            </section>
            <br />
            <br />
            <br />
            <br />
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



export default LoginForm;
