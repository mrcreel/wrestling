import * as z from 'zod'
import { ObjectId } from 'mongodb'
import { fa } from 'zod/v4/locales/index.cjs'

export const ParamsWithId = z.object({
  id: 
    z
      .string()
      .min(1)
      .refine(
        (val) => {
          try {
            return new ObjectId(val)
          } catch (error) {
            console.log(`Invalid ObjectId`)
            return false
          }
        },
        {
          message: `Invalid ObjectId`
        }
      )

})