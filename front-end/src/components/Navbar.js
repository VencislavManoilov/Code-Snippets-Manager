import React from "react";
import "./css/main.css";

const User = ({isLoggedIn}) => {
    return (
        <div>
            {isLoggedIn ? (
                <a className="d-flex link" href="/profile">{isLoggedIn.name}</a>
            ) : (
                <div>
                    <a href="/login" className="login link badge text-bg-primary">Login</a>
                    <a href="/signup" className="signup link badge text-bg-success">Sign Up</a>
                </div>
            )}
        </div>
    );
}

const Navbar = ({isLoggedIn}) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" style={{"fontWeight": "bold"}}>Code Snippets Manager</a>
                {<User isLoggedIn={isLoggedIn} />}
            </div>
        </nav>
    );
};

export default Navbar;