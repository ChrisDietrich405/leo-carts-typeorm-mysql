import { Router } from "express";
import CarController from "../controllers/cars";
import { body, param } from "express-validator";
import auth from "../middleware/auth";

const router = Router();

const validation = [
  body("name")
    .exists()
    .withMessage("Name missing")
    .notEmpty()
    .withMessage("Name should not be empty")
    .trim()
    .isLength({ min: 4, max: 10 })
    .isAlphanumeric()
    .withMessage("Name should have only alphanumeric values"),

  body("make")
    .exists()
    .withMessage("Make missing")
    .notEmpty()
    .withMessage("Make should not be empty")
    .trim()
    .isLength({ min: 4, max: 10 })
    .isAlphanumeric()
    .withMessage("Make should have only alphanumeric values"),

  body("model")
    .exists()
    .withMessage("Model missing")
    .notEmpty()
    .withMessage("Model should not be empty")
    .trim()
    .isLength({ min: 4, max: 10 })
    .isAlphanumeric()
    .withMessage("Model should have only alphanumeric values"),
];

const validationUpdateCar = [
  param("id").exists().notEmpty().trim().isNumeric(),
  body("name")
    .exists()
    .withMessage("Name missing")
    .notEmpty()
    .withMessage("Name should not be empty")
    .trim()
    .isLength({ min: 1, max: 10 })
    .isAlphanumeric()
    .withMessage("Name should have only alphanumeric values"),

  body("make")
    .exists()
    .withMessage("Make missing")
    .notEmpty()
    .withMessage("Make should not be empty")
    .trim()
    .isLength({ min: 4, max: 10 })
    .isAlphanumeric()
    .withMessage("Make should have only alphanumeric values"),

  body("model")
    .exists()
    .withMessage("Model missing")
    .notEmpty()
    .withMessage("Model should not be empty")
    .trim()
    .isLength({ min: 4, max: 10 })
    .isAlphanumeric()
    .withMessage("Model should have only alphanumeric values"),
];

const validationDeleteCar = [
  param("id")
    .exists()
    .withMessage("Id should exist")
    .notEmpty()
    .withMessage("Id should not be empty")
    .trim()
    .isNumeric()
    .withMessage("Model should have only numeric values"),
];

const validationGetOneCar = [
  param("id")
    .exists()
    .withMessage("Id should exist")
    .notEmpty()
    .withMessage("Id should not be empty")
    .trim()
    .isNumeric()
    .withMessage("Model should have only numeric values"),
];

router.post("/create", auth, [...validation], CarController.carRegistration);
router.put(
  "/update/:id",
  auth,
  [...validationUpdateCar],
  CarController.updateCar
);
router.patch(
  "/registration/:id",
  auth,
  [...validationUpdateCar],
  CarController.partialUpdateCar
);
router.delete(
  "/delete/:id",
  auth,
  [...validationDeleteCar],
  CarController.deleteCar
);
router.get("/", auth, CarController.getAllCars);
router.get("/:id", auth, [...validationGetOneCar], CarController.getOneCar);

export { router };
