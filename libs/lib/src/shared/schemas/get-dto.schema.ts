import * as Joi from 'joi';

export default Joi.object({
  Id: Joi.string().required(),
  CreateDate: Joi.date().iso(),
  UpdatedDate: Joi.date().iso(),
});
