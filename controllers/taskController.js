import Task from "../models/task.js"

//Creating task
export const createTask = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            createdBy: req.user._id
        });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
}

//GET tasks
export const getTasks = async (req, res) => {
    try {

        let tasks;
        if (req.user.role === "admin") {
            tasks = await Task.find({}).populate("createdBy", "name email");
        } else {

            tasks = await Task.find({ createdBy: req.user._id });
        }

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching task" });
    }
};

//UPDATE tasks
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Owner or admin check
        if (
            req.user.role !== "admin" &&
            task.createdBy.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
};

// DELETE task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        if (
            req.user.role !== "admin" &&
            task.createdBy.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await task.deleteOne();

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
};