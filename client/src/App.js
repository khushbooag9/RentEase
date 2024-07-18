import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/Login.js';
import TenantRegister from './pages/TenantRegister.js';
import LandlordRegister from './pages/LandlordRegister.js';
import Layout from './Layout.js';
import { TenantProvider } from './tenantContext.js';
import axios from 'axios';
import TenantPage from './pages/TenantPage.js';
import UserProfile from './pages/UserProfile.js';
import Appointment from './pages/Appointment.js';
import Payment from './pages/Payment.js';
import Booking from './pages/Booking.js';
import Feedback from './pages/Feedback.js';
import Contact from './pages/Contact.js';
import About from './pages/About.js';
import PropertyDetails from './pages/PropertyDetails';
import L_PropertyDetails from './pages/L_PropertyDetails.js';
import LandlordPage from './pages/LandlordPage.js';
import Feature from './pages/Feature.js';
import AddProperty from './pages/AddProperty.js';
import UpdateProperty from './pages/UpdateProperty.js';
import { LandlordProvider } from './landlordContext.js';

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <TenantProvider>
      <LandlordProvider>
        <Routes>
          <Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="TenantRegister" element={<TenantRegister />} />
              <Route path="LandlordRegister" element={<LandlordRegister />} />
            </Route>

            <Route path="/TenantPage" element={<TenantPage />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/Appointment" element={<Appointment />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Booking" element={<Booking />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
            <Route path="/Feature" element={<Feature />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/l_property/:id" element={<L_PropertyDetails />} />

            <Route path="/LandlordPage" element={<LandlordPage />} />
            <Route path="/AddProperty" element={<AddProperty />} />
            <Route path="/UpdateProperty/:id" element={<UpdateProperty />} />

          </Route>
        </Routes>
      </LandlordProvider>
    </TenantProvider>
  );
}

export default App;
