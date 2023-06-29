import logo from './logo.svg';
import './App.css';
import HomeComponent from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Appointment from './components/Appoinment';
import {BrowserRouter as Router} from "react-router-dom";
import {Route,Routes} from "react-router-dom";
import LoginForm from './components/Login';
import DoctorLoginForm from './components/DoctorLogin';
import PatientLoginForm from './components/PatientLogin';
import Doclist from './components/Doctors';
import ResetPassword from './components/ResetPassword';
import Registration from './components/Register';
import Aboutus from './components/Aboutus';
import DocRegistration from './components/DoctorRegister';
import App1 from './components/AllPatients';
import AdminPortal from './components/AdminPortal';
import AppointmentDisplay from './components/AllAppointments';
import ViewStatus from './components/ViewStatus';
import AllDoctors from './components/AllDoctors';
import ModifyAppointment from './components/ModifyAppointment';
import DoctorPortal from './components/DoctorPortal';
import ViewAppointments from './components/ViewAppointments';
import PatientPortal from './components/PatientPortal';
import DoctorViewStatus from './components/DoctorViewStatus';
import PatientAccount from './components/PatientAccount';
import Prescription from './components/Prescription';
import ViewPrescription from './components/ViewPrescription';
import DoctorAccount from './components/DoctorAccount';
import AddAdmin from './components/AddAdmin';
import ModifyPageDoctor from './components/ModifyPageDoctor';
import ModifyPagePatient from './components/ModifyPagePatient';
import Acceptedapp from './components/Acceptedapp';


function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path='/' element={<HomeComponent/>} />
      <Route index element = {<HomeComponent/>}/>
      <Route path='/Appointment' element={<Appointment/>} />
      <Route path='/Login' element={<LoginForm/>} />
      <Route path='/DoctorLogin' element={<DoctorLoginForm/>} />
      <Route path='/PatientLogin' element={<PatientLoginForm/>} />
      <Route path='/Register' element={<Registration/>} />
      <Route path='/Doctors' element={<Doclist/>}/>
      <Route path='/ResetPassword' element={<ResetPassword/>}/>
      <Route path='/Aboutus' element={<Aboutus/>}/>
      <Route path='/DoctorRegister' element={<DocRegistration/>}/>
      <Route path='/AllPatients' element={<App1/>}/>
      <Route path='/AdminPortal' element={<AdminPortal/>}/>
      <Route path='/AllAppointments' element={<AppointmentDisplay/>}/>
      <Route path='/ViewStatus' element={<ViewStatus/>}/>
      <Route path='/AllDoctors' element={<AllDoctors/>}/>
      <Route path='/ModifyAppointment' element={<ModifyAppointment/>}/>
      <Route path='/DoctorPortal' element={<DoctorPortal/>}/>
      <Route path='/ViewAppointments' element={<ViewAppointments/>}/>
      <Route path='/PatientPortal' element={<PatientPortal/>}/>
      <Route path='/DoctorViewStatus' element={<DoctorViewStatus/>}/>
      <Route path='/PatientAccount' element={<PatientAccount/>}/>
      <Route path='/Prescription' element={<Prescription/>}/>
      <Route path='/ViewPrescription' element={<ViewPrescription/>}/>
      <Route path='/DoctorAccount' element={<DoctorAccount/>}/>
      <Route path='/AddAdmin' element={<AddAdmin/>}/>
      <Route path='/ModifyPageDoctor' element={<ModifyPageDoctor/>}/>
      <Route path='/ModifyPagePatient' element={<ModifyPagePatient/>}/>
      <Route path='/Acceptedapp' element={<Acceptedapp/>}/>


      

    </Routes>
  </Router>
    </div>
  );
}

export default App;
