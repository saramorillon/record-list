import { z } from 'zod'

export const env = z
  .object({
    RECORDS_DIR: z.string(),
  })
  .parse(process.env)
