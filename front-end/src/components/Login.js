import React, { useState } from "react";
import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_CUSTOM_BACKEND_URL || "http://localhost:8080";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(URL+"/login", {
                email: email,
                password: password
            }, { withCredentials: true });

            if(response) {
                window.location.href = "/";
            }

        } catch (err) {
            if(err.response.data.errors) {
                let msg = "";
                for(let i = 0; i < err.response.data.errors.length; i++) {
                    msg += err.response.data.errors[i] + "\n";
                }
                setError(msg.replace(/\n/g, '<br>'));
            } else {
                setError((err.response.data.error) ? err.response.data.error : "Login failed! Please check your information");
            }
        }
    };

    return (
        <div className="col-12 col-lg-6 container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger" dangerouslySetInnerHTML={{ __html: error }}></div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mt-2">Don't have an account! <a href="/signup">Register</a></div>

                                <div className="col-12 text-end">
                                    <button type="submit" className="btn btn-primary mt-3">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;