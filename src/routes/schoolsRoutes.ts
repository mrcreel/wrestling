import {Router, Request, Response} from 'express'

import {schools} from '../data'

const router = Router()

// Get all schools
router.get('/', (req: Request, res: Response) => {
  res.json(schools)
})

export default router