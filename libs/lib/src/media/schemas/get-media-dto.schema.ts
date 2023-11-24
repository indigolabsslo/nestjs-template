import * as Joi from 'joi';
import getDtoSchema from '../../shared/schemas/get-dto.schema';

export default getDtoSchema.keys({
  Name: Joi.string().required(),
  Public: Joi.boolean().required(),
  Type: Joi.string().required(),
  Url: Joi.string().required(),
});
