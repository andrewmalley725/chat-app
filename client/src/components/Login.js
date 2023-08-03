import React from "react";
import { useRef, useState } from "react";
import axios from 'axios';

export default function Login() {
    const apiURL = 'api';
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

        axios.post(`${apiURL}/authenticate`, body).then((response) => {
            console.log(response.data)
            if (response.data.status === "success")
            {
                localStorage.setItem("userId", response.data.record.userid);
                localStorage.setItem("username", response.data.record.username);
                window.location.href = '/index';
            }
            else
            {
                setMsg(response.data.status);
            }
        });
    }

    return(
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
                <form className="p-4 border rounded" onSubmit={handleSubmit}>
                <h3 className="mb-3 text-center">Login</h3>
                <h4 className="mb-3 text-center" style={{display: msg ? 'block' : 'none', color: 'red'}}>{msg}</h4>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                    Username
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    id="username"
                    onChange={(e) => (userName.current = e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                    Password
                    </label>
                    <input
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={(e) => (passWord.current = e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
                </form>
            </div>
        </div>
      </div>
    )
}