import { z } from "zod";

export const concertSchema = z.object({
  name: z
    .string()
    .min(1, "Concert name is required"),
  date: z
    .string()
    .min(1, "Date and time is required")
    .refine(
      (val) => {
        if (!val) return false;
        const date = new Date(val);
        const now = new Date();
        const minDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
        return date >= minDate;
      },
      { message: "Concert date must be at least 2 weeks in the future" }
    ),
  venue: z
    .string()
    .min(1, "Venue is required"),
  budget: z
    .number()
    .positive("Budget must be greater than zero"),
  description: z
    .string()
    .optional(),
  artistId: z
    .number()
    .positive("Please select an artist"),
});

export type ConcertFormData = z.infer<typeof concertSchema>;

