import { AppError } from "../../common/errors/AppError";
import { UserRepository } from "./user.repository";

import bcrypt from "bcrypt";


export class UserService {
  private userRepository = new UserRepository();

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async updateProfile(
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    profileImage?: string;
  }
) {
  return this.userRepository.updateProfile(
    userId,
    data
  );
}

async changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
) {
const user =
  await this.userRepository.findUserWithPassword(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }


  const isValid =
    await bcrypt.compare(
      currentPassword,
      user.password
    );


  if (!isValid) {
    throw new AppError(
      "Current password is incorrect",
      400
    );
  }


  const hashedPassword =
    await bcrypt.hash(
      newPassword,
      12
    );


  await this.userRepository.updatePassword(
    userId,
    hashedPassword
  );


  return {
    message:
      "Password changed successfully",
  };
}


async deleteAccount(userId: string) {

  const user =
    await this.userRepository.findById(userId);

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }


  await this.userRepository.deleteAccount(
    userId
  );


  return {
    message:
      "Account deleted successfully",
  };
}
}