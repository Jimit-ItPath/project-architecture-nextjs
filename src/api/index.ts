import client, { METHODS } from './client';

export const api = {
  auth: {
    register: ({ data, ...configs }: { data: any; [key: string]: any }) =>
      client({
        url: '/auth/register',
        method: METHODS.POST,
        data,
        ...configs,
      }),
    login: ({ data, ...configs }: { data: any; [key: string]: any }) =>
      client({
        url: '/auth/login',
        method: METHODS.POST,
        data,
        ...configs,
      }),
    logout: ({ ...configs }: { [key: string]: any } = {}) =>
      client({
        isServer: true,
        url: '/auth/logout',
        method: METHODS.POST,
        ...configs,
      }),
  },
  users: {
    getAll: ({ data, ...configs }: { [key: string]: any }) =>
      client({
        url: '/users',
        method: METHODS.GET,
        data,
        ...configs,
      }),
    get: ({ id, ...configs }: { id: string; [key: string]: any }) =>
      client({
        url: `/users/${id}`,
        method: METHODS.GET,
        ...configs,
      }),
    create: ({ data, ...configs }: { data: any; [key: string]: any }) =>
      client({
        url: '/users',
        method: METHODS.POST,
        data,
        ...configs,
      }),
    update: ({
      id,
      data,
      ...configs
    }: {
      id: string;
      data: any;
      [key: string]: any;
    }) =>
      client({
        url: `/users/${id}`,
        method: METHODS.PUT,
        data,
        ...configs,
      }),
    delete: ({ id, ...configs }: { id: string; [key: string]: any }) =>
      client({
        url: `/users/${id}`,
        method: METHODS.DELETE,
        ...configs,
      }),
  },
};
