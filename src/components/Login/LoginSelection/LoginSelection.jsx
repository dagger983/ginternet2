import React, { useState } from 'react';
import '../Login.css';
import { Link } from 'react-router-dom';
function LoginSelection() {


    return (
        <div>
            <h1 style={{ backgroundColor: "yellow", color: "black", padding: "10px" }}>Ganapathy Internet Sales Management System</h1>
            <div className='login-page'>

                <div className='login-container2'>
                    <p style={{ fontSize: "30px", color: "black" }}>Login Selection</p>
                    <div className='loginSelectionContainer'>
                        <Link to="/employee-login">
                            <div>
                                <img style={{ cursor: "pointer" }} src='./employee.png' className='loginSelection' alt="Employee Login" />
                                <p style={{ cursor: "pointer", textAlign: 'center' }}>Employee</p>
                            </div>
                        </Link>
                        <Link to="/owner-login">
                            <div>
                                <img style={{ cursor: "pointer" }} src='./owner.png' className='loginSelection' alt="Owner Login" />
                                <p style={{ cursor: "pointer", textAlign: 'center' }}>Owner</p>
                            </div>
                        </Link>

                    </div>
                </div>

            </div>
        </div>

    );
}

export default LoginSelection;
