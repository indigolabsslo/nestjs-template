import * as Joi from 'joi';
import getDtoSchema from '../../shared/schemas/get-dto.schema';

export default getDtoSchema.keys({
  name: Joi.string().required(),
  public: Joi.boolean().required(),
  type: Joi.string().required(),
  url: Joi.string().required(),
});
