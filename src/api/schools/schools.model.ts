import * as z from 'zod'
import { WithId } from 'mongodb'

import { db } from '@/db'
import { Wrestler } from '../wrestlers/wrestlers.model'

export const School = z.object({
    schoolId: z.int(),
    wrestlers: z.array(Wrestler)
})

export type School = z.infer<typeof School>
export type SchoolWithId = WithId<School>
export const Schools = db.collection<School>('schools')