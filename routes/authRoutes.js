import express from "express";
import { body } from "express-validator";
import { validate } from "../middlewares/validate.js";
import { registerController, loginController } from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router();

//register validation
router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters"),
    ],
    validate,
    registerController
);


//login validation
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email required"),
        body("password").notEmpty().withMessage("Password required"),
    ],
    validate,
    loginController
);

router.get("/admin-dashboard", requireSignIn, isAdmin);
export default router;