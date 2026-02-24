import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css"

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [openTaskId, setOpenTaskId] = useState(null);

    const token = localStorage.getItem("token");

    const fetchTasks = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/tasks`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("FETCHED:", res.data);

            setTasks(res.data.tasks);
        } catch (error) {
            console.log("FETCH ERROR:", error.response?.data);
        }
    };
    const createTask = async () => {
        try {
            if (!title.trim() || !description.trim()) return;

            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/tasks`,
                { title, description },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTasks(prev => [...prev, res.data]);

            setTitle("");
            setDescription("");

        } catch (error) {
            console.log(error.response?.data);
        }
    };

    const updateTask = async (id) => {
        try {
            if (!editTitle.trim() || !editDescription.trim()) {
                alert("Fields cannot be empty");
                return;
            }

            const res = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/tasks/${id}`,
                {
                    title: editTitle,
                    description: editDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Replace updated task in state
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === id ? res.data : task
                )
            );

            setEditTaskId(null);
        } catch (error) {
            console.log(error.response?.data);
        }
    };

    const deleteTask = async (id) => {
        await axios.delete(
            `${process.env.REACT_APP_API}/api/v1/tasks/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setTasks(prev => prev.filter(task => task._id !== id));
    };

    useEffect(() => {
        if (token) {
            fetchTasks();
        }
    }, [token]);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Dashboard</h2>

            {/* Create Task Section */}
            <div className="task-form">
                <textarea
                    className="task-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title..."
                    rows="2"
                />

                <textarea
                    className="task-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description..."
                    rows="3"
                />

                <button
                    className="add-btn"
                    type="button"
                    onClick={createTask}
                >
                    Add Task
                </button>
            </div>

            {/* Task List */}
            <div className="task-list">
                {Array.isArray(tasks) &&
                    tasks.map((task) => (
                        <div
                            className="task-card"
                            key={task._id}
                            onClick={() =>
                                setOpenTaskId(
                                    openTaskId === task._id ? null : task._id
                                )
                            }
                        >
                            {/* LEFT SIDE */}
                            <div style={{ flex: 1 }}>

                                {/* EDIT MODE */}
                                {editTaskId === task._id ? (
                                    <>
                                        <textarea
                                            value={editTitle}
                                            onChange={(e) =>
                                                setEditTitle(e.target.value)
                                            }
                                            rows="2"
                                        />

                                        <textarea
                                            className="task-input auto-textarea"
                                            value={description}
                                            onChange={(e) => {
                                                setDescription(e.target.value);
                                                e.target.style.height = "auto";
                                                e.target.style.height = e.target.scrollHeight + "px";
                                            }}
                                            placeholder="Enter description..."
                                        />

                                        <div style={{ marginTop: "8px" }}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    updateTask(task._id);
                                                }}
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditTaskId(null);
                                                }}
                                                style={{ marginLeft: "8px" }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* NORMAL VIEW */}
                                        <span className="task-title">
                                            {task.title}
                                        </span>

                                        {openTaskId === task._id && (
                                            <p className="task-description">
                                                {task.description}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* RIGHT SIDE BUTTONS */}
                            {editTaskId !== task._id && (
                                <div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditTaskId(task._id);
                                            setEditTitle(task.title);
                                            setEditDescription(task.description);
                                        }}
                                        style={{ marginRight: "8px" }}
                                    >
                                        Update
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteTask(task._id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
}
export default Dashboard;