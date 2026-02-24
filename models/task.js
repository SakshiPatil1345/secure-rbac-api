import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdBy: {
        type: mongoose.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;