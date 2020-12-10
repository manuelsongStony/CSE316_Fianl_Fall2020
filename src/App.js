import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"

import HomePage from "./components/home-page.component";
import LabTechLogin from "./components/lab-tech-login.component";
import EmployeeLogin from "./components/employee-login.component";

import EmployeeHome from "./components/employee-home.component";
import LabHome from "./components/lab-home.component";
import testCollection from "./components/test-collection.component";
import poolMapping from "./components/pool-mapping.component";
import wellTesting from "./components/well-testing.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Route path="/" exact component={HomePage} />
      
      <Route path="/labtech" component={LabTechLogin} />
      <Route path="/employee" component={EmployeeLogin} />
      <Route path="/employeeHome" component={EmployeeHome} />

      <Route path="/labHome" component={LabHome} />
      <Route path="/testCollection" component={testCollection} />
      <Route path="/poolMapping" component={poolMapping} />
      <Route path="/wellTesting" component={wellTesting} />
      </div>
    </Router>
  );
}

export default App;
