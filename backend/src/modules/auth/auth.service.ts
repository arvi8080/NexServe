import bcrypt from "bcrypt";
import { AuthRepository } from "./auth.repository";
import { AppError } from "../../common/errors/AppError";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/jwt";
import { verifyRefreshToken } from "../../common/utils/jwt";

export class AuthService {
  private authRepository = new AuthRepository();

  async register(data: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  }) {
    const existingUser = await this.authRepository.findUserByEmail(data.email);

    if (existingUser) {
      throw new AppError("Email already registered", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await this.authRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    const { password, ...safeUser } = user;

    return safeUser;
  }

  async login(data: {
    email: string;
    password: string;
  }) {
    const user = await this.authRepository.findUserByEmail(data.email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    await this.authRepository.createSession({
      userId: user.id,
      refreshToken,
      expiresAt: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
      ),
    });

    await this.authRepository.updateLastLogin(user.id);

    const { password, ...safeUser } = user;

    return {
      user: safeUser,
      accessToken,
      refreshToken,
    };
  }

  async logout(refreshToken: string) {
  const session =
    await this.authRepository.findSessionByRefreshToken(refreshToken);

  if (!session) {
    throw new AppError("Session not found", 404);
  }

  await this.authRepository.deleteSession(refreshToken);

  return {
    message: "Logged out successfully",
  };
}

async refresh(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);

  const session =
    await this.authRepository.findSessionByRefreshToken(refreshToken);

  if (!session) {
    throw new AppError("Invalid refresh token", 401);
  }

  const accessToken = generateAccessToken({
    id: payload.id,
    email: payload.email,
    role: payload.role,
  });

  return {
    accessToken,
  };
}
}