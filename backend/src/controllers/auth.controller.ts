import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config.js";

interface LoginPayloadType {
  name: string;
  email: string;
  oauth_id: string;
  provider: string;
  image: string;
}

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const body: LoginPayloadType = req.body;
      
      if (!body.email || !body.name || !body.oauth_id || !body.provider) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      let findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        findUser = await prisma.user.create({
          data: body,
        });
      }

      let JWTPayload = {
        name: body.name,
        email: body.email,
        id: findUser.id,
      };

      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret is not defined." });
      }

      const token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
        expiresIn: "365d",
      });

      return res.json({
        message: "Logged in successfully!",
        user: {
          ...findUser,
          token: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong, please try again!" });
    }
  }
}

export default AuthController;