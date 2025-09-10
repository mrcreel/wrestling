import { Router } from "express";

import * as WrestlerHandler from './wrestlers.handlers'
import { Wrestler } from "./wrestlers.model";

import { ParamsWithId } from "@/interfaces/ParamsWithId"
import { validateRequest } from "@/middlewares"

const router = Router()

router.get('/', WrestlerHandler.FindAll)

export default router