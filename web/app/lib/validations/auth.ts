import { z } from "zod";
import type { RegisterRequestRoleEnum } from "~/api";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Invalid password"),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "Please enter your first name"),
    lastName: z
      .string()
      .min(1, "Please enter your last name"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    role: z
      .string()
      .min(1, "Please select a role")
      .refine(
        (val) => ["COORDINATOR", "BUDGET_MANAGER", "TECHNICAL_MANAGER"].includes(val),
        { message: "Please select a valid role" }
      )
      .transform((val) => val as "COORDINATOR" | "BUDGET_MANAGER" | "TECHNICAL_MANAGER"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export function registerFormDataToRequest(
  data: RegisterFormData
): {
  firstName: string;
  lastName: string;
  email: string;
  role: RegisterRequestRoleEnum;
  password: string;
  confirmPassword: string;
} {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role as RegisterRequestRoleEnum,
    password: data.password,
    confirmPassword: data.confirmPassword,
  };
}

