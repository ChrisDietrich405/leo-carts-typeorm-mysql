import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import AppDataSource from "../../db/config/db";
import { User } from "../Entities/users";

class UserController {
  async createUser(req: Request, res: Response) {
    const error = validationResult(req);

    if (error.isEmpty()) {
      try {
        const { name, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await AppDataSource.manager.save(User, {
          name,
          email,
          password: hashedPassword,
        });

        res.status(201).json("User created");
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Duplicate email" });
      }
    } else {
      res.status(403).json(error);
    }
  }

  async deleteUser(req: Request, res: Response) {
    console.log("hello");
    const error = validationResult(req);

    if (error.isEmpty()) {
      try {
        const { id } = req.params;

        const findUser = await AppDataSource.manager.findBy(User, {
          id: Number(id),
        });

        if (findUser) {
          await AppDataSource.manager.delete(User, findUser);
        }

        return res.status(201).json({ message: "Deleted successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Server failed" });
      }
    } else {
      return res.status(403).json(error);
    }
  }
}

export default new UserController();
