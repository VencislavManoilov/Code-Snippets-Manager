import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import axios from "axios";
import Navbar from './components/Navbar';
import Login from './components/Login';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkLoginStatus();
    }, []);
    
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get("http://192.168.1.11:8080/user", { withCredentials: true });
            if (response.data.success) {
                setUser(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Failed to check login status:", error);
            setLoading(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Navbar />
            {user ? <h3>You are logged in!</h3> : <Login />}
        </Router>
    );
}

export default App;