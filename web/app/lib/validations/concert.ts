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
        
        // Parse ISO string format: YYYY-MM-DDTHH:mm:ss or YYYY-MM-DDTHH:mm
        const isoMatch = val.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
        if (!isoMatch) {
          // Try parsing as regular date string
          const parsed = new Date(val);
          if (isNaN(parsed.getTime())) return false;
          
          const concertDateOnly = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
          const todayOnly = new Date();
          todayOnly.setHours(0, 0, 0, 0);
          
          const diffTime = concertDateOnly.getTime() - todayOnly.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          return diffDays >= 14;
        }
        
        // Parse from ISO string components to avoid timezone issues
        const year = parseInt(isoMatch[1], 10);
        const month = parseInt(isoMatch[2], 10) - 1; // Month is 0-indexed
        const day = parseInt(isoMatch[3], 10);
        
        const concertDateOnly = new Date(year, month, day);
        const todayOnly = new Date();
        todayOnly.setHours(0, 0, 0, 0);
        
        // Calculate difference in days
        const diffTime = concertDateOnly.getTime() - todayOnly.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays >= 14;
      },
      { message: "Concert date must be planned at least 2 weeks ahead" }
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

