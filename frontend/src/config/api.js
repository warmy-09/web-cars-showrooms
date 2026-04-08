const rawApiBase = import.meta.env.VITE_API_BASE_URL || '/api';

const normalizedApiBase = rawApiBase.endsWith('/')
  ? rawApiBase.slice(0, -1)
  : rawApiBase;

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedApiBase}${normalizedPath}`;
};
