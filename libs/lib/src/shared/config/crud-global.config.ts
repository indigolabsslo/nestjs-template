import { CrudGlobalConfig } from '@indigolabs/crud';

export const crudGlobalConfig: CrudGlobalConfig = {
  query: {
    alwaysPaginate: true,
    limit: 25,
    cache: 2000,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  routes: {
    updateOneBase: {
      allowParamsOverride: true,
    },
    deleteOneBase: {
      returnDeleted: true,
    },
    exclude: ['createManyBase'],
  },
};
