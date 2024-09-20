import body from "express-validator";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const validateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (value, { req }) => {
      if (!value) {
        throw new Error("Email is required");
      }
      const admin = await prisma.admin.findUnique({ where: { email: value } });
      if (admin && admin.id !== Number(req.params.id)) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export { validateUser };
