import bcrypt from "bcrypt";
import { AuthRepository } from "./auth.repository";
import { AppError } from "../../common/errors/AppError";

export class AuthService {
  private authRepository = new AuthRepository();

  async register(data: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  }) {

    const existingUser =
      await this.authRepository.findUserByEmail(data.email);


    if (existingUser) {
      throw new AppError(
        "Email already registered",
        409
      );
    }


    const hashedPassword =
      await bcrypt.hash(data.password, 12);


    const user =
      await this.authRepository.createUser({
        ...data,
        password: hashedPassword,
      });


    // Remove sensitive information
    const {
      password,
      ...safeUser
    } = user;


    return safeUser;
  }
}