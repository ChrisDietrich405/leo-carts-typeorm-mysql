import { Router } from "express";
import CarController from "../controllers/cars";
import { body, param } from "express-validator";

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

const validationDeleteCar = [
  param("id").exists().notEmpty().trim().isNumeric(),
];

router.post("/registration", [...validation], CarController.carRegistration);
router.put(
  "/registration/:id",
  [...validationUpdateCar],
  CarController.updateCar
);
router.patch(
  "/registration/:id",
  [...validationUpdateCar],
  CarController.partialUpdateCar
);
router.delete(
  "/registration/:id",
  [...validationDeleteCar],
  CarController.deleteCar
);
router.get("/", CarController.getAllCars);
router.get("/:id", CarController.getOneCar);

export { router };
