const basePath = process.env.NODE_ENV === 'production' ? '/topteam' : '';

export function getAssetPath(path: string | undefined | null) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('https') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
