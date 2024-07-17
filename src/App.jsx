import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginSelection from './components/Login/LoginSelection/LoginSelection';
import EmployeeDashboard from './components/EmployeeDashboard/EmployeeDashboard';
import OwnerDashboard from './components/OwnerDashboard/OwnerDashboard';
import OwnerLogin from "./components/Login/OwnerLogin/OwnerLogin";
import EmployeeLogin from "./components/Login/EmployeeLogin/EmployeeLogin";
import NewEmployee from './components/Login/EmployeeLogin/NewEmployee';
import SalesDetails from "./components/OwnerDashboard/SalesDetails"
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginSelection />} />
        <Route path='/owner-login' element={<OwnerLogin />} />
        <Route path='/employee-login' element={<EmployeeLogin />} />
        <Route path='/new-employee' element={<NewEmployee />} />
        <Route path='/employee-dashboard' element={<EmployeeDashboard />} />
        <Route path='/owner-dashboard' element={<OwnerDashboard />} />
      </Routes>
    </>
  );
}

export default App;
