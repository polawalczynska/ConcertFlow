import { z } from "zod";

export const artistSchema = z.object({
  name: z
    .string()
    .min(1, "Artist name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const cleaned = val.replace(/[\s\-.( )]/g, "");
        const phonePattern = /^\+?[1-9]\d{6,14}$/;
        return phonePattern.test(cleaned);
      },
      { message: "Please enter a valid phone number (e.g., +1 (215) 801-4090)" }
    ),
  genre: z
    .string()
    .optional(),
  website: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const withoutProtocol = val.replace(/^https?:\/\//i, "");
        const domainPattern = /^([\da-z]([\da-z-]*[\da-z])?\.)+[a-z]{2,}(\/.*)?$/i;
        return domainPattern.test(withoutProtocol);
      },
      { message: "Please enter a valid website URL (e.g., www.example.com or https://example.com)" }
    ),
  contactPerson: z
    .string()
    .optional(),
});

export type ArtistFormData = z.infer<typeof artistSchema>;

