import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import { log } from "console";

class ChatGroupController {
    static async index (req: Request, res: Response) {
        try {
            const user = req.user;
            
            const groups = await prisma.chatGroup.findMany({
              where: {
                user_id: user.id,
              },
              orderBy: {
                created_at: "desc",
              },
            });

            return res.json({ message: "Chat Groups Fetched Successfully", data: groups });
          } catch (error) {
            return res
              .status(500)
              .json({ message: "Something went wrong.please try again!" });
          }
    }

    static async show (req: Request, res: Response) {
      try {
        const { id } = req.params;
        if (id) {
          const group = await prisma.chatGroup.findUnique({
            where: {
              id: id,
            },
          });
          return res.json({ message: "Chat Group Fetched Successfully", data: group });
        }
  
        return res.status(404).json({ message: "No groups found" });
      } catch (error) {
        return res  
          .status(500)
          .json({ message: "Something went wrong.please try again!" });
      }
    }

    static async store (req: Request, res: Response) {
      try {
        const body = req.body;
        const user = req.user;

        await prisma.chatGroup.create({
          data: {
            title: body?.title,
            passcode: body?.passcode,
            user_id: user.id,
          },
        });
  
        return res.json({ message: "Chat Group created successfully!" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Something went wrong.please try again!" });
      }
    }

    static async update (req: Request, res: Response) {
      try {
        const { id } = req.params;
        const body = req.body;

        if (id) {
          const existingData = await prisma.chatGroup.findUnique({
            where: {
              id: id
            }
          })

          if (!existingData) {
            return res.status(404).json({ message: "Group not found" });
          }

          const isDataSame = Object.entries(body).every(
            ([key, value]) => existingData[key as keyof typeof existingData] === value
          );

          if (isDataSame) {
            return res.status(200).json({ message: "No changes detected, data is already up-to-date" });
          }

          const updatedData = await prisma.chatGroup.update({
            data: body,
            where: {
              id: id,
            },
          });

          return res.json({ message: "Group updated successfully!", data: updatedData });
        }
  
        return res.status(404).json({ message: "No groups found" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Something went wrong.please try again!" });
      }
    }
  
    static async destroy (req: Request, res: Response) {
      try {
        const { id } = req.params;

        await prisma.chatGroup.delete({
          where: {
            id: id,
          },
        });

        return res.json({ message: "Chat Deleted successfully!" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Something went wrong, please try again!" });
      }
    }
}

export default ChatGroupController;