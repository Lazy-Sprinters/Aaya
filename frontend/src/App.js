import React from "react";
import "./App.css";
import Home from "./pages/Home";
import RegisterCustomer from "./Forms/RegisterCustomer";
import PatientDetails from "./Forms/PatientDetails";
import RegisterServiceProvider from "./Forms/RegisterServiceProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";
import "antd/dist/antd.css";
import Admin from "./pages/Admin";
import Client from "./pages/Client";
import Service from "./pages/Service";
import ClientService from "./pages/Client/service";
import ClientBooking from "./pages/Client/booking";

/* Enter URL without ending slash */
export const ROOT_URL = "https://9525-117-201-76-153.ngrok.io";

function App() {
  return (
    <>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/registerCustomer" element={<RegisterCustomer />} />
          <Route path="/patientDetails" element={<PatientDetails />} />
          <Route path="/registerSP" element={<RegisterServiceProvider />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/client" element={<Client />} />
          <Route path="/clientService" element={<ClientService />} />
          <Route path="/clientBooking" element={<ClientBooking />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
