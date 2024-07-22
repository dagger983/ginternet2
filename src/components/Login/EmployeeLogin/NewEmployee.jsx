import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie';

const styles = {
    page: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("./yellow-bg.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    container: {
        width: '300px',
        fontFamily: '"Outfit", sans-serif',
        fontWeight: 450,
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '12px',
        textAlign: 'center',
        backdropFilter: 'blur(10px) saturate(200%)',
        WebkitBackdropFilter: 'blur(10px) saturate(200%)',
        border: '1px solid rgba(209, 213, 219, 0.3)'
    },
    form: {
        width: 'calc(100% - 40px)',
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px'
    },
    button: {
        width: '150px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '18px',
        transition: 'background-color 0.3s ease'
    },
    buttonHover: {
        backgroundColor: '#0056b3'
    },
    eyeButton: {
        background: 'none',
        border: 'none',
        position: 'relative',
        top: '-2px',
        right: '25px',
        cursor: 'pointer'
    },
    newpasswordinput: {
        position: 'relative',
        left: '10px'
    }
};

function NewEmployee() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [mobile_number, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !mobile_number || !password) {
            alert('Username, Mobile Number, and Password are required!');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('https://ginternet.onrender.com/employee-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, mobile_number })
            });

            if (response.ok) {
                alert('Registration Successful');
                Cookies.set('employee-registered', 'ok', { expires: 1 });
                Cookies.set("username",username,{ expires: 1 })
                window.location.href = '/employee-dashboard';
            } else {
                alert('Registration Failed!');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration Failed!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = Cookies.get('employee-registered');
        Cookies.set("employee-username",username,{ expires: 1 })
        if (token) {
            window.location.href = '/employee-dashboard';
        }
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <p style={{ fontSize: '30px', color: 'black' }}>New Employee Registration</p>
                <form onSubmit={handleSubmit}>
                    <input
                        style={styles.form}
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    /><br />
                    <input
                        style={styles.form}
                        type="tel"
                        placeholder="Mobile Number"
                        name="mobile"
                        value={mobile_number}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                    /><br />
                    <div style={styles.newpasswordinput}>
                        <input
                            style={{
                                position: 'relative',
                                right: '5px',
                                marginTop: '20px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px',
                                width: '84%'
                            }}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            style={styles.eyeButton}
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            aria-pressed={showPassword}
                        >
                            {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                        </button>
                    </div>
                    <br />
                    <button
                        style={styles.button}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                        type="submit"
                    >
                        {loading ? (
                            <ClipLoader color="#ffffff" loading={loading} css={override} size={20} />
                        ) : (
                            <span>Submit</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewEmployee;
