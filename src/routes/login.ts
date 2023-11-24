import { Router } from "express";
import LoginController from "../controllers/login";
import { body, param, matchedData } from "express-validator";

const router = Router();
const loginValidation = [
  body("email")
    .exists()
    .withMessage("Email missing")
    .notEmpty()
    .withMessage("Email should not be empty")
    .trim()
    .isLength({ min: 4, max: 20 })
    .isAscii()
    .withMessage("Email should have only valid characters")
    .isEmail()
    .withMessage("Email should be a valid email address"),

  body("password")
    .exists()
    .withMessage("Password missing")
    .notEmpty()
    .withMessage("Password should not be empty")
    .trim()
    .isLength({ min: 4, max: 10 })
    .isAscii()
    .withMessage("Password should have only valid characters"),
];

router.post("/", [...loginValidation], LoginController.login);

export { router };
