import { Router } from "express"

import * as SchoolHandler from './schools.handlers'
import { School } from "./schools.model"
import { validateRequest } from "@/middlewares"
import { ParamsWithId } from "@/interfaces/ParamsWithId"

const router = Router()

router.get('/', SchoolHandler.FindAll)

router.post(
  `/`,
  validateRequest({
    body: School
  }),
  SchoolHandler.InsertOne
)

export default router