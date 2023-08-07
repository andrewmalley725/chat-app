import React from "react";
import { useRef } from "react";
import axios from 'axios';
import '../Login.styles.css';

export default function NewUser({api}) {
    const userName = useRef("");
    const passWord = useRef("");
    const firstName = useRef("");
    const lastName = useRef("");
    const email = useRef("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            userName: userName.current,
            first: firstName.current,
            last: lastName.current,
            pass: passWord.current,
            email: email.current
        }

        axios.post(`${api}/addUser`, body).then((response) => {
            localStorage.setItem("userId", response.data.record.userid);
            localStorage.setItem("username", response.data.record.username);
            window.location.href = '/index';
        });


    };

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h3 className="login-title">New Account</h3>
                        <div className="login-input-group">
                            <label htmlFor="username" className="login-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="login-input"
                                id="username"
                                onChange={(e) => (firstName.current = e.target.value)}
                            />
                        </div>
                        <div className="login-input-group">
                            <label htmlFor="username" className="login-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="login-input"
                                id="username"
                                onChange={(e) => (lastName.current = e.target.value)}
                            />
                        </div>
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
                        <div className="login-input-group">
                            <label htmlFor="username" className="login-label">
                                Email
                            </label>
                            <input
                                type="text"
                                className="login-input"
                                id="username"
                                onChange={(e) => (email.current = e.target.value)}
                            />
                        </div>
                        <button type="submit" className="login-button">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}