import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                {
                    name,
                    email,
                    password,
                }
            );

            if (res.data.success) {
                alert("Registration Successful");

                navigate("/login");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        placeholder="Enter Your Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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

                    <button type="submit">REGISTER</button>
                </form>
            </div>
        </div>
    );
};

export default Register;