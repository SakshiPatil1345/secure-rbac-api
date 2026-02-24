import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <h2 className="logo">Secure RBAC App</h2>

            <div className="nav-links">
                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>

                        {user?.role === "admin" ? (
                            <Link to="/admin">Dashboard</Link>
                        ) : (
                            <Link to="/dashboard">Dashboard</Link>
                        )}

                        <div className="dropdown">
                            <div
                                className="dropdown-trigger"
                                onClick={() => setOpen(!open)}
                            >
                                {user?.name} ⌄
                            </div>

                            {open && (
                                <div className="dropdown-menu">
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;