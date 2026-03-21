import { z } from "zod";

export const duaSchema = z.object({
  importer: z.string(),
  exporter: z.string(),
  value: z.number(),
});