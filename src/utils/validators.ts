import { z } from "zod";

export const zSubDirectory = z.object({
  name: z
    .string()
    .regex(/[^A-Za-z0-9\-]+/g, {
      message: 'Can only contain letters, numbers, and "-"',
    })
    .min(1, { message: "Required" })
    .max(10, { message: "Must be less than 10" }),
});

export const zYTSearch = z.object({ username: z.string() });
