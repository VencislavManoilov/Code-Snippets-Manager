import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from "axios";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';

const InitComponent = ({ user }) => {
    return user ? (
        <h3>You are logged in!</h3>
    ) : (
        <h3 className='text-center mt-5'>You need to <Link to="/login">login</Link></h3>
    );
};

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
            setLoading(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<InitComponent user={user} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;