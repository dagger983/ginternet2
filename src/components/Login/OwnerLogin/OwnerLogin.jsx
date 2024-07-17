import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

function OwnerLogin() {
    const [showPassword, setShowPassword] = useState(false);
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

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            alert("Username and Password are required !");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('https://ginternet.onrender.com/owner-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const token = await response.json();
            if (token) {
                Cookies.set("ownerlogin", token.token, { expires: 1 });
                Cookies.set("username", username, { expires: 1 });
                alert("Login Successfully");
                window.location.href = '/owner-dashboard'; // Adjust route as needed
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
        const token = Cookies.get("ownerlogin");
        if (token) {
            window.location.href = '/owner-dashboard'; // Adjust route as needed
        }
    }, []);

    const styles = {
        loginPage: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            backgroundImage: 'url("./yellow-bg.png")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },
        loginContainer: {
            width: '300px',
            fontFamily: 'Outfit',
            fontWeight: 450,
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
        },
        loginForm: {
            width: 'calc(100% - 20px)',
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
        },
        loginBtn: {
            width: '150px',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '18px',
            transition: 'background-color 0.3s ease',
        },
        eyeBtn: {
            background: 'none',
            border: 'none',
            position: 'relative',
            top: '-2px',
            right: '25px',
            cursor: 'pointer',
        },
        link: {
            marginTop: '10px',
            cursor: 'pointer',
            textDecoration: 'none',
            color: '#007bff',
            display: 'block',
        },
    };

    return (
        <div style={styles.loginPage}>
            <div style={styles.loginContainer}>
                <p style={{ fontSize: '30px', color: 'black' }}>Owner Login</p>
                <form onSubmit={handleLogin}>
                    <input
                        style={styles.loginForm}
                        type="text"
                        placeholder='Username'
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <br />
                    <div style={{ position: 'relative', left: '8px' }}>
                        <input
                            style={styles.loginForm}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            style={styles.eyeBtn}
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <br />
                    <button
                        style={styles.loginBtn}
                        onClick={handleLogin}
                        type="submit"
                    >
                        {loading ? (
                            <ClipLoader color={'#ffffff'} loading={loading} css={override} size={20} />
                        ) : (
                            <span>Submit</span>
                        )}
                    </button>
                </form>
                
            </div>
        </div>
    );
}

export default OwnerLogin;
