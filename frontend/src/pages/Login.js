import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/login`,
                {
                    email,
                    password,
                }
            );

            if (res.data.success) {
                // Store token and user
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                alert("Login Successful");

                if (res.data.user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        placeholder="Enter Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        value={password}
                        placeholder="Enter Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">LOGIN</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
