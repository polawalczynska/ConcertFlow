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
    phone: z
      .string()
      .optional(),
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

export const settingsSchema = z
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
    phone: z
      .string()
      .optional(),
    role: z
      .string()
      .min(1, "Please select a role")
      .refine(
        (val) => ["COORDINATOR", "BUDGET_MANAGER", "TECHNICAL_MANAGER"].includes(val),
        { message: "Please select a valid role" }
      )
      .transform((val) => val as "COORDINATOR" | "BUDGET_MANAGER" | "TECHNICAL_MANAGER"),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // If any password field is filled, all password fields are required
    const hasAnyPassword = data.currentPassword || data.newPassword || data.confirmPassword;
    
    if (hasAnyPassword) {
      if (!data.currentPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Current password is required when changing password",
          path: ["currentPassword"],
        });
      }
      if (!data.newPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "New password is required when changing password",
          path: ["newPassword"],
        });
      }
      if (data.newPassword && data.newPassword.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters long",
          path: ["newPassword"],
        });
      }
      if (!data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please confirm your new password",
          path: ["confirmPassword"],
        });
      }
      if (data.newPassword && data.confirmPassword && data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }
    }
  });

export type SettingsFormData = z.infer<typeof settingsSchema>;

export function registerFormDataToRequest(
  data: RegisterFormData
): {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: RegisterRequestRoleEnum;
  password: string;
  confirmPassword: string;
} {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    role: data.role as RegisterRequestRoleEnum,
    password: data.password,
    confirmPassword: data.confirmPassword,
  };
}

