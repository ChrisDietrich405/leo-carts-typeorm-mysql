import { Request, Response } from "express";
import { Car } from "../Entities/cars";
import { validationResult } from "express-validator";
import AppDataSource from "../../db/config/db";

class CarController {
  async carRegistration(req: Request, res: Response) {
    const error = validationResult(req);
    if (error.isEmpty()) {
      const { name, make, model } = req.body;

      const newCar = new Car();

      newCar.name = name;
      newCar.make = make;
      newCar.model = model;

      await AppDataSource.manager.save(newCar);

      return res
        .status(201)
        .json({ message: "Registered successfully", data: newCar });
    } else {
      return res.status(201).json(error);
    }
  }

  async updateCar(req: Request, res: Response) {
    const error = validationResult(req);

    if (error.isEmpty()) {
      const { name, make, model } = req.body;
      const { id } = req.params;

      const updatedCar = await AppDataSource.manager.update(
        Car,
        { id: Number(id) },
        { name, make, model }
      );

      return res
        .status(201)
        .json({ message: "Updated successfully", data: updatedCar });
    } else {
      return res.status(201).json(error);
    }
  }

  async partialUpdateCar(req: Request, res: Response) {
    const error = validationResult(req);

    if (error.isEmpty()) {
      const { name, make, model } = req.body;
      const { id } = req.params;

      const updatedCar = await AppDataSource.manager.update(
        Car,
        { id: Number(id) },
        { name, make, model }
      );

      return res
        .status(201)
        .json({ message: "Updated successfully", data: updatedCar });
    } else {
      return res.status(201).json(error);
    }
  }

  async deleteCar(req: Request, res: Response) {
    const error = validationResult(req);

    if (error.isEmpty()) {
      const { id } = req.params;

      const findCar = await AppDataSource.manager.findBy(Car, {
        id: Number(id),
      });

      if (findCar) {
        await AppDataSource.manager.delete(Car, findCar);
      }

      return res.status(201).json({ message: "Deleted successfully" });
    } else {
      return res.status(201).json(error);
    }
  }

  async getAllCars(req: Request, res: Response) {
    const allCars = await AppDataSource.manager.find(Car);

    return res
      .status(201)
      .json({ message: "Found all cars successfully", data: allCars });
  }

  async getOneCar(req: Request, res: Response) {
    const { id } = req.params;

    const findCar = await AppDataSource.manager.findBy(Car, {
      id: Number(id),
    });

    return res
      .status(200)
      .json({ message: "Found car successfully", data: findCar });
  }
}

export default new CarController();
