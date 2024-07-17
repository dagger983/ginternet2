import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

function EmployeeLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const loginBtn = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            alert("Username and Password are required !");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('https://ginternet.onrender.com/employee-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const token = await response.json();
            if (token) {
                Cookies.set("employeelogin", token.token, { expires: 1 });
                Cookies.set("employee-username",username,{ expires: 1 })
                alert("Login Successfully");
                window.location.href = '/employee-dashboard';
            } else {
                alert("Login Failed !");
            }
        } catch (error) {
            console.error('Login error:', error);
            alert("Login Failed !");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        const token = Cookies.get("employeelogin");
        if (token) {
            window.location.href = '/employee-dashboard';
        }
    }, []);

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                backgroundImage: 'url("./yellow-bg.png")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >

            <div />

            <div
                style={{
                    width: '300px',
                    fontFamily: 'Outfit',
                    fontWeight: 450,
                    padding: '20px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                }}
            >
                <p style={{ fontSize: '30px', color: 'black' }}>Employee Login</p>
                <form>
                    <input
                        style={{
                            width: 'calc(100% - 20px)',
                            marginTop: '20px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px',
                        }}
                        type="text"
                        placeholder='Username'
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    /><br />
                    <div style={{ position: 'relative', left: '8px' }}>
                        <input
                            style={{
                                width: 'calc(100% - 20px)',
                                marginTop: '20px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px',
                            }}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            style={{
                                background: 'none',
                                border: 'none',
                                position: 'relative',
                                top: '-2px',
                                right: '25px',
                                cursor: 'pointer',
                            }}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <br />
                    <button
                        style={{
                            width: '150px',
                            padding: '10px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '18px',
                            transition: 'background-color 0.3s ease',
                        }}
                        onClick={loginBtn}
                        type="submit"
                    >
                        {loading ? (
                            <ClipLoader color={'#ffffff'} loading={loading} css={override} size={20} /> // React-spinner loading animation
                        ) : (
                            <span>Submit</span>
                        )}
                    </button>
                </form>
                <Link to="/new-employee">
                    <p
                        style={{
                            marginTop: '10px',
                            cursor: 'pointer',
                        }}
                        onClick={() => { setNewUser(!newUser) }}
                    >
                        New Employee ? Sign Up
                    </p>
                </Link>

            </div>
        </div>
    );
}

export default EmployeeLogin;
