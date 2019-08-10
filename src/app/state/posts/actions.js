import * as types from './types';

export const fetchAll = () => ({
  type: types.FETCH_ALL,
  meta: {
    async: true,
    blocking: true,
    path: `/posts`,
    method: 'GET',
  },
});
