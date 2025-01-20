import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Email is not valid" })
    .min(1, { message: "Required" }),
  password: z.string().min(1, { message: "Pasword is required" }),
});

export const registerFormBackendSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string()
    .email({ message: "Email is not valid" })
    .min(1, { message: "Required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
