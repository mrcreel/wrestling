import * as z from 'zod'
import { WithId } from 'mongodb'

import { db } from '../../db'

export const Wrestler = z.object({
    wrestlerId: z.int(),
    abilityScore: z.int()
})

export type WrestlerWithId = WithId<Wrestler>
export type Wrestler = z.infer<typeof Wrestler>
export const Wrestlers = db.collection<Wrestler>('wrestlers')