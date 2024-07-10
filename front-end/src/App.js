import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import axios from "axios";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Create from "./components/Create";
import Snippet from "./components/Snippet";
import Footer from "./components/Footer";
import "./components/css/app.css";

const URL = process.env.REACT_APP_BACKEND_URL || process.env.REACT_APP_CUSTOM_BACKEND_URL || "http://localhost:8080";

const InitComponent = ({ user }) => {
    return user ? (
        <div className="container">
            <h2 className="mt-5">Welcome back!</h2>
            <div className='mt-5' style={{backgroundColor: "rgba(0, 0, 0, 0.15)", border: "2px solid rgba(0, 0, 0, 0.3)", borderRadius: "20px"}}>
                <Create />
            </div>
        </div>
    ) : (
        <div className="container-fluid mt-5 text-center">
            <section id="hero">
                <p className="h1">Effortlessly Save, Share, and Manage Your Code Snippets</p>
                <p className="h5 fw-normal mt-4">Join thousands of developers who use our tool to boost their productivity. <a className="btn btn-success" href="/signup">Sign Up</a></p>
            </section>

            <section id="features" className="row gy-3 mt-5">
                <h2>Features</h2>

                <div className="feature">
                    <h4>🎨 Syntax Highlighting</h4>
                    <p>Supports 156 different languages.</p>
                </div>

                <div className="feature">
                    <h4>🔁 Share</h4>
                    <p>Use QR code or URL to share your snippet to anyone!</p>
                </div>

                <div className="feature">
                    <h4>✏️ Edit</h4>
                    <p>Coming soon!</p>
                </div>
            </section>
        </div>
    );
};

function App() {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get(URL+"/user", { withCredentials: true });
                if (response.data) {
                    setUser(response.data.user);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        }
        
        checkLoginStatus();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Navbar isLoggedIn={user} />
            <Routes>
                <Route path='/' element={<InitComponent user={user} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<Profile user={user} />} />
                <Route path='/create' element={<Create />} />
                <Route path='/snippet' element={<SnippetWrapper />} />
            </Routes>
            <Footer />
        </Router>
    );
}

const SnippetWrapper = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    return <Snippet snippetId={id} hasBackButton={false} backToProfileFunction={() => {}} />;
};

export default App;