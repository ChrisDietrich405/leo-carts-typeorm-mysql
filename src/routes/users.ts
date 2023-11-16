import { Router } from "express";
import UserController from "../controllers/users";
import { body, param, matchedData } from "express-validator";

const router = Router();
const createUserValidation= [
  body("name")
    .exists()
    .withMessage("Name missing")
    .notEmpty()
    .withMessage("Name should not be empty")
    .trim()
    .isLength({ min: 4, max: 10 })
    .isAscii()
    .withMessage("Name should have only valid characters"),

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

  body("confirm password")
    .exists()
    .withMessage("Password missing")
    .notEmpty()
    .withMessage("Password should not be empty")
    .trim()
    .custom((value, { req }) => {
      const {password} = matchedData(req)
      return password === value
    }),
];


const deleteValidation = [
  param("id")
    .exists()
    .withMessage("Id must be provided")
    .notEmpty()
    .withMessage("Id should not be empty")
    .trim()   
    .isNumeric()
    .withMessage("Id must be a numeric value")
]

router.post("/", [...createUserValidation], UserController.createUser);
router.delete("/:id", [...deleteValidation], UserController.deleteUser);

export { router };
