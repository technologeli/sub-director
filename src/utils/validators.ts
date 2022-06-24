import { z } from "zod";

export const zSubDirectory = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9\-]*$/g, {
      message: "Can only contain letters, numbers, and dashes",
    })
    .min(1, { message: "Required" })
    .max(100, { message: "Must be less than 100" }),
});

export const zYTSearch = z.object({ username: z.string() });
