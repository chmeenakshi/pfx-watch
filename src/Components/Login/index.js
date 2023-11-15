import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import './index.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showSubmitError, setShowSubmitError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const token = Cookies.get('jwt_token');
        if (token !== undefined) {
            navigate("/");
        }
    }, []);

    const onGetEmail = (event) => {
        setEmail(event.target.value);
    };

    const onGetPassword = (event) => {
        setPassword(event.target.value);
    };

    const onSubmitForm = async (event) => {
        event.preventDefault();
        const url = `http://localhost:4448/auth/login`;
        const options = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                Cookies.set('jwt_token', data.token);
                navigate("/");
            } else {
                setShowSubmitError(true);
                setErrorMsg(data.message);
            }
        } catch (error) {
            setShowSubmitError(true);
            setErrorMsg("An error occurred while logging in.");
        }

        setEmail("");
        setPassword("");
    }

    return (
        <div className="login-container">
            <form className="login-form-container">
                <div className="forms">
                    <div className="form-logo-container  ">
                        <img className="logo"  src='data:image/jpeg;base64,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' alt="Description of the image" />
                    </div>
                    <div className="form-group">
                        <div className="label-form">

                            <label className="form-label" htmlFor="email">
                                Email
                            </label>

                            <div className="form-out">
                                <i class="fas fa-user"></i>
                                <input
                                    className="form-input"
                                    type="text"
                                    value={email}
                                    onChange={onGetEmail}
                                    placeholder="email"
                                    id="email"
                                    required
                                /><br />

                            </div>
                        </div>
                        {showSubmitError && <p className="error-message">*{errorMsg}</p>}

                        <br />
                        <div className="form-count">

                            <label className="form-labels" htmlFor="password">
                                PASSWORD
                            </label>
                            <div>
                                <div className="form-out">
                                    <i class="fas fa-lock"></i>
                                    {/* <AiFillEye/>
                                    <AiFillEyeInvisible/> */}
                                    <input

                                        className="form-input"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={onGetPassword}
                                        placeholder="password" id="password"
                                        required

                                    />

                                </div>



                                <br />
                                {showSubmitError && <p className="error-message">*{errorMsg}</p>}
                            </div>
                        </div>
                        <br />
                        <button className="button-icons" type="text" onClick={() => setShowPassword(!showPassword)} value={showPassword ? 'Show Password' : 'Hide Password'}>Show/Hide </button>
                        <br />
                        <br />
                        <button className="form-submit-button" type="submit" onClick={onSubmitForm}>Login</button>
                        <p><a className="link" href="/signup" >if you are not having an account signup</a></p>
                        {/* <p><a className="link" href="/" >go to home</a></p> */}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;