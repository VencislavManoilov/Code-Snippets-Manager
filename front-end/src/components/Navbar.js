import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import css from "./css/main.css";

const User = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            await axios.get("http://192.168.1.11:8080/user", { withCredentials: true });
            setIsLoggedIn(true);
        } catch (error) {
            setIsLoggedIn(false);
        }
    }

    return (
        <div>
            {isLoggedIn ? (
                <h3 className="d-flex">Logged in</h3>
            ) : (
                <div>
                    <a href="/login" className="login badge text-bg-primary">Login</a>
                    <a href="/signup" className="signup badge text-bg-success">Sign Up</a>
                </div>
            )}
        </div>
    );
}

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Code Snippets Manager</a>
                {<User />}
            </div>
        </nav>
    );
};

export default Navbar;