import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Register from "./pages/Register";
import {useAuth} from "./context/AuthContext";
import Preferences from "./pages/Preferences";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
    const {authenticatedUser, logoutUser} = useAuth();

    return (
        <Router>
            <Navbar
                authenticatedUser={authenticatedUser}
                logout={logoutUser}/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Feed/>}/>
                    {authenticatedUser ?
                        <Route path="/profile" element={<Preferences/>}/>
                        :
                        <>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                        </>
                    }
                </Routes>
            </div>
        </Router>
    );
};

export default App;