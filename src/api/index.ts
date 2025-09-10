import {Request, Response, Router} from "express"

import MessageResponse from "@/interfaces/MessageResponse"

import wrestlers from './wrestlers/wrestlers.routes'

// import schools from '../routes/schoolsRoutes'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'http://localhost:3000/api/v0'
    })
})

router.use('/wrestlers', wrestlers)
// router.use('/schools', schools)


export default router