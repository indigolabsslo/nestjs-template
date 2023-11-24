import * as Joi from 'joi';
import getListDtoSchema from '@lib/shared/schemas/get-list-dto.schema';
import getOrganizationDtoSchema from './get-organization-dto.schema';

export default getListDtoSchema.keys({
  data: Joi.array().items(getOrganizationDtoSchema),
});
