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

export const ROOT_URL="https://c1c2-117-201-76-153.ngrok.io";

function App() {
  return (
    <>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route
            path="/registerCustomer"
            element={<RegisterCustomer />}
          />
          <Route path="/patientDetails" element={<PatientDetails />} />
          <Route
            path="/registerSP"
            element={<RegisterServiceProvider />}
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
