import { z } from 'zod'

export const env = z
  .object({
    RECORD_DIR: z.string(),
  })
  .parse(process.env)
