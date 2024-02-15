import React from "react";
import { Link } from "react-router-dom";
import { User } from "../model/User";

interface NavbarProps {
    authenticatedUser: User,
    logout: () => void
}

const Navbar: React.FC<NavbarProps> = ({ authenticatedUser, logout }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">News feed</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {authenticatedUser ?
                            <>
                                <li className="nav-item">
                                    <span className="nav-link disabled">
                                        How are you, {authenticatedUser.username}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">Edit preferences</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" onClick={logout} className="nav-link">Logout</Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
