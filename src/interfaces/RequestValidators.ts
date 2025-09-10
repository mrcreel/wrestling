import {ZodAny} from 'zod'

export default interface RequestValidators {
    body?: ZodAny
    params?: ZodAny 
    query?: ZodAny
}