const rawApiBase = import.meta.env.VITE_API_BASE_URL || '/api';

const isBrowser = typeof window !== 'undefined';
const isLocalHost = isBrowser
  ? ['localhost', '127.0.0.1'].includes(window.location.hostname)
  : false;

const shouldForceSameOriginApi =
  isBrowser &&
  !isLocalHost &&
  typeof rawApiBase === 'string' &&
  /localhost|127\.0\.0\.1/i.test(rawApiBase);

const safeApiBase = shouldForceSameOriginApi ? '/api' : rawApiBase;

const normalizedApiBase = safeApiBase.endsWith('/')
  ? safeApiBase.slice(0, -1)
  : safeApiBase;

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedApiBase}${normalizedPath}`;
};
