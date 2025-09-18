import { ZodType } from 'zod';

export default interface RequestValidators {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}
