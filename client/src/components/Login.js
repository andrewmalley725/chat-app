import React from "react";
import { useRef, useState } from "react";
import axios from 'axios';
import '../Login.styles.css';


export default function Login({ api }) {
    const [msg, setMsg] = useState("");
    const userName = useRef("");
    const passWord = useRef("");

    function handleSubmit(event) {
        event.preventDefault();
        localStorage.clear();

        const body = {
            username: userName.current,
            password: passWord.current
        }

        axios.post(`${api}/authenticate`, body).then((response) => {
            if (response.data.status === "success") {
                localStorage.setItem("userId", response.data.record.userid);
                localStorage.setItem("username", response.data.record.username);
                window.location.href = '/index';
            }
            else {
                setMsg(response.data.status);
            }
        });
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h3 className="login-title">Login</h3>
                        <h4 className="login-error" style={{ display: msg ? 'block' : 'none' }}>{msg}</h4>
                        <div className="login-input-group">
                            <label htmlFor="username" className="login-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="login-input"
                                id="username"
                                onChange={(e) => (userName.current = e.target.value)}
                            />
                        </div>
                        <div className="login-input-group">
                            <label htmlFor="password" className="login-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="login-input"
                                id="password"
                                onChange={(e) => (passWord.current = e.target.value)}
                            />
                        </div>
                        <a href='/newUser' className='new-user'>Create an account</a>
                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}