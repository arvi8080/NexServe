import { Request, Response } from "express";
import { ChatService } from "./chat.service";

const chatService = new ChatService();

export class ChatController {
  async sendMessage(req: Request, res: Response) {
    const message = await chatService.sendMessage(
      req.user!.id,
      String(req.params.bookingId),
      req.body.content
    );

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  }

  async getMessages(req: Request, res: Response) {
    const messages = await chatService.getMessages(
      req.user!.id,
      String(req.params.bookingId)
    );

    return res.status(200).json({
      success: true,
      data: messages,
    });
  }
}

export const chatController = new ChatController();