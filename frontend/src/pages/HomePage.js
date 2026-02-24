import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Secure RBAC App</h1>

                <p>
                    A Role-Based Access Control system where administrators
                    manage users and tasks securely, and users can manage
                    their own tasks efficiently.
                </p>

                <div className="hero-buttons">
                    <Link to="/login" className="primary-btn">
                        Login
                    </Link>

                    <Link to="/register" className="secondary-btn">
                        Register
                    </Link>
                </div>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <h3>Secure Authentication</h3>
                    <p>JWT-based authentication with protected routes.</p>
                </div>

                <div className="feature-card">
                    <h3>Role-Based Access</h3>
                    <p>Admin and User roles with different permissions.</p>
                </div>

                <div className="feature-card">
                    <h3>Task Management</h3>
                    <p>Create, update, and manage tasks efficiently.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;