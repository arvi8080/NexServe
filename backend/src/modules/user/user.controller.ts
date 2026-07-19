import { Request, Response } from "express";
import { UserService } from "./user.service";

const userService = new UserService();

export class UserController {
  async getProfile(req: Request, res: Response) {
    const user = await userService.getProfile(req.user!.id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  }


  async updateProfile(req: Request, res: Response) {
  const user = await userService.updateProfile(
    req.user!.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
}



async changePassword(
  req: Request,
  res: Response
) {

  const result =
    await userService.changePassword(
      req.user!.id,
      req.body.currentPassword,
      req.body.newPassword
    );


  return res.status(200).json({
    success: true,
    ...result,
  });
}

async deleteAccount(
  req: Request,
  res: Response
) {

  const result =
    await userService.deleteAccount(
      req.user!.id
    );


  return res.status(200).json({
    success: true,
    ...result,
  });
}

}




export const userController = new UserController();