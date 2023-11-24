import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppDataSource from "../../db/config/db";
import { User } from "../Entities/users";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  let token: string = req.headers.authorization as string;

  try {
    if (token) {
      token = token.split(" ")[1] as string;

      const decoded = await (<jwt.JwtPayload>(
        jwt.verify(token, process.env.JWT_SECRET!)
      ));

      const findEmail = await AppDataSource.manager.findBy(User, {
        email: decoded.email,
      });

      if (!findEmail) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      return res.status(401).json("Unauthorized");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
