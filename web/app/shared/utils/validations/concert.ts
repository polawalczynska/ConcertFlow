import { z } from "zod";

const dateValidation = z
  .string()
  .min(1, "Date and time is required")
  .refine(
    (val) => {
      if (!val) return false;
      
      const isoMatch = val.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
      if (!isoMatch) {
        const parsed = new Date(val);
        if (isNaN(parsed.getTime())) return false;
        
        const concertDateOnly = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
        concertDateOnly.setHours(0, 0, 0, 0);
        
        const todayOnly = new Date();
        todayOnly.setHours(0, 0, 0, 0);
        
        const diffTime = concertDateOnly.getTime() - todayOnly.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 14;
      }
      
      const year = parseInt(isoMatch[1], 10);
      const month = parseInt(isoMatch[2], 10) - 1;
      const day = parseInt(isoMatch[3], 10);
      
      const concertDateOnly = new Date(year, month, day);
      concertDateOnly.setHours(0, 0, 0, 0);
      
      const todayOnly = new Date();
      todayOnly.setHours(0, 0, 0, 0);
      const diffTime = concertDateOnly.getTime() - todayOnly.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays >= 14;
    },
    { message: "Concert date must be planned at least 2 weeks ahead" }
  );

const baseConcertSchema = {
  name: z
    .string()
    .min(1, "Concert name is required"),
  venue: z
    .string()
    .min(1, "Venue is required"),
  city: z
    .string()
    .min(1, "City is required"),
  budget: z
    .number()
    .positive("Budget must be greater than zero"),
  description: z
    .string()
    .optional(),
  artistId: z
    .number()
    .positive("Please select an artist"),
};

export const concertSchema = z.object({
  ...baseConcertSchema,
  date: dateValidation,
});

export const concertSchemaForEdit = z.object({
  ...baseConcertSchema,
  date: z.string().min(1, "Date and time is required"),
});

export type ConcertFormData = z.infer<typeof concertSchema>;

