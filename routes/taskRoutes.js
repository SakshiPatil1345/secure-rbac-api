import express from 'express';
import { body } from "express-validator";
import { validate } from "../middlewares/validate.js";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';

import { requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post(
    "/",
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
    ],
    validate,
    requireSignIn,
    createTask
);
router.get("/", requireSignIn, getTasks);
router.put("/:id", requireSignIn, updateTask);
router.delete("/:id", requireSignIn, deleteTask);

export default router;
