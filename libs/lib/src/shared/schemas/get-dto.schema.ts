import * as Joi from 'joi';

export default Joi.object({
  id: Joi.string().required(),
  createDate: Joi.date().iso(),
  updateDate: Joi.date().iso(),
});
