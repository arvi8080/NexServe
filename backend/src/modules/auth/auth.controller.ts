import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const user = await authService.register(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  }

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  }

  async logout(req: Request, res: Response) {
  const { refreshToken } = req.body;

  const result = await authService.logout(refreshToken);

  return res.status(200).json({
    success: true,
    ...result,
  });
}

async refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;

  const result = await authService.refresh(refreshToken);

  return res.status(200).json({
    success: true,
    data: result,
  });
}

}



export const authController = new AuthController();