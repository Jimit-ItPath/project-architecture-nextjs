import { API, SERVER } from '../configs/env';
import {
  isNotEmptyObject,
  apiAsyncHandler,
  getTokenSync,
} from '@/utils/helper';
import { ERROR_MESSAGES } from '../utils/constants';

const BASE_URL = API.URL;
const DEFAULT_PREFIX = '/api';
const FULL_BASE_URL = `${BASE_URL}${DEFAULT_PREFIX}`;

const FULL_SERVER_URL = `${SERVER.URL}${DEFAULT_PREFIX}`;

export const METHODS = {
  POST: 'post',
  GET: 'get',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
  HEAD: 'head',
  OPTIONS: 'options',
};

const client = async ({
  url = '',
  method = 'GET',
  data = {},
  cookieToken = '',
  headers = {},
  isServer = false,
  ...rest
}: {
  method: string;
  url: string;
  cookieToken?: string;
  isServer?: boolean;
  headers?: Record<string, string>;
  data?: {
    params?: any;
    [key: string]: unknown;
  };
  rest?: Record<string, unknown>;
}) => {
  let fullUrl = isServer
    ? `${FULL_SERVER_URL}${url}`
    : `${FULL_BASE_URL}${url}`;
  let token = cookieToken;

  const { params, ...restData } = data;

  // Handle query params
  if (isNotEmptyObject(params)) {
    const queryParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    );
    const queryString = new URLSearchParams(queryParams).toString();
    fullUrl += `?${queryString}`;
  }

  // ✅ On server, read cookies via `next/headers`
  if (!token && typeof window !== 'undefined') {
    const tokenCookie = getTokenSync();
    token = tokenCookie || '';
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    credentials: 'include',
    ...rest,
  };

  if (restData && method !== METHODS.GET) {
    fetchOptions.body = JSON.stringify(restData);
  }

  return await apiAsyncHandler(
    async () => {
      const res = await fetch(fullUrl, fetchOptions);
      const isJSON = res.headers
        .get('Content-Type')
        ?.includes('application/json');
      const responseType = isJSON ? await res.json() : await res.text();

      if (!res.ok) {
        return { status: res?.status, data: responseType };
      } else {
        const { data, error } = responseType || {};
        const status: number = error?.status;

        const message =
          ERROR_MESSAGES[String(status) as keyof typeof ERROR_MESSAGES] ||
          ERROR_MESSAGES.common;

        throw {
          status,
          message,
          data,
          apiError: error || {},
        };
      }
    },
    error => {
      throw error;
    }
  );
};

export default client;
