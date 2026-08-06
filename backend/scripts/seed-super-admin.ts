import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Role } from "@prisma/client";
import prisma from "../src/config/prisma";

dotenv.config();

async function main() {
  const email = process.env.SUPER_ADMIN_EMAIL || "superadmin@glowhome.com";
  const password = process.env.SUPER_ADMIN_PASSWORD || "GlowHome@123";

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: {
        role: Role.SUPER_ADMIN,
        firstName: existing.firstName || "Super",
        lastName: existing.lastName || "Admin",
      },
    });

    console.log(`Super admin already exists: ${email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      firstName: "Super",
      lastName: "Admin",
      email,
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
      isEmailVerified: true,
    },
  });

  console.log(`Created super admin: ${email}`);
}

main()
  .catch((error) => {
    console.error("Failed to seed super admin:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
