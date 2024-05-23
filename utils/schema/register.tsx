import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(5).max(50),
  password: z.string().min(6).max(50),
  email: z.string().email(),
});
