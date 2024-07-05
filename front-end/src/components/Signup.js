import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(18);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/signup", {
                name: name,
                email: email,
                password: password,
                age: age
            }, { withCredentials: true });

            window.location.href = "/login";
            // Handle successful login (e.g., store token, redirect)
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your email and password.");
        }
    };

    return (
        <div className="col-12 col-lg-6 container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Signup</div>
                        <div className="card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="text">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mt-2">
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
                                <div className="form-group mt-2">
                                    <label htmlFor="number">Age</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        onChange={(e) => setAge(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;