import * as Joi from 'joi';

export default Joi.object({
  data: Joi.array().required(),
  count: Joi.number().required(),
  total: Joi.number().required(),
  page: Joi.number().required(),
  pageCount: Joi.number().required(),
});
