import { Request, Response } from "express";
import { User } from "../Entities/users";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import AppDataSource from "../../db/config/db";

class LoginController {
  async login(req: Request, res: Response) {
    const error = validationResult(req);
    const { name, email, password } = req.body;

    if (error.isEmpty()) {
      try {
        const findUser = await AppDataSource.manager.findOneBy(User, { email });
        if (!findUser) {
          return res.status(401).json({ message: "User unauthorized" });
        }

        const matchedPassword = await bcrypt.compare(
          password,
          findUser.password
        );

        if (!matchedPassword) {
          return res.status(401).json({ message: "User unauthorized" });
        } else {
        
          res.status(200).json({
            token: jwt.sign( 
              { email: findUser.email, exp: 60 },
              process.env.JWT_SECRET as string
            ),
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(403).json(error);
    }
  }
}

export default new LoginController();
