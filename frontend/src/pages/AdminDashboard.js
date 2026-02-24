import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

function AdminDashboard() {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    const token = localStorage.getItem("token");

    // Fetch ALL Tasks (Admin)
    const fetchAllTasks = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/tasks`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks(res.data.tasks);
        } catch (error) {
            console.log("TASK ERROR:", error.response?.data);
        }
    };

    //Fetch ALL Users (Admin Only Route)
    const fetchAllUsers = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUsers(res.data.users || res.data);
        } catch (error) {
            console.log("USER ERROR:", error.response?.data);
        }
    };

    //Delete Task
    const deleteTask = async (id) => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/tasks/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks((prev) => prev.filter((task) => task._id !== id));
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAllTasks();
            fetchAllUsers();
        }
    }, [token]);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Admin Dashboard</h1>

            {/* USERS SECTION */}
            <div className="admin-section">
                <h2>All Users</h2>

                {users.map((user) => (
                    <div className="admin-user-card" key={user._id}>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                ))}
            </div>

            {/* TASKS SECTION */}
            <div className="admin-section">
                <h2>All Tasks</h2>

                {tasks.map((task) => (
                    <div className="task-card" key={task._id}>
                        <div>
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>

                            {task.createdBy && (
                                <p style={{ fontSize: "12px", color: "gray" }}>
                                    Created By: {task.createdBy.name} ({task.createdBy.email})
                                </p>
                            )}
                        </div>

                        <button
                            className="delete-btn"
                            onClick={() => deleteTask(task._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;