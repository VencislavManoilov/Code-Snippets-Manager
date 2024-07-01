import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Test from './test';

function App() {
    return (
        <Router>
            <Test />
        </Router>
    );
}

export default App;
