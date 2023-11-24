import * as Joi from 'joi';
import getDtoSchema from '../../shared/schemas/get-dto.schema';
import getMediaDtoSchema from '../../media/schemas/get-media-dto.schema';

export default getDtoSchema.keys({
  Name: Joi.string().required(),
  Image: getMediaDtoSchema,
  NumberOfUsers: Joi.number().required(),
});
