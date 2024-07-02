import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from "axios";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

const InitComponent = ({ user }) => {
    return user ? (
        <h2>Welcome</h2>
    ) : (
        <h3 className='text-center mt-5'>You need to <Link to="/login">login</Link></h3>
    );
};

function App() {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkLoginStatus();
    }, []);
    
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8080/user", { withCredentials: true });
            if (response.data) {
                setUser(response.data.user);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    }

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
            </Routes>
        </Router>
    );
}

export default App;