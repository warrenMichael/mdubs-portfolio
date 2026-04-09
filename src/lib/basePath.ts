/**
 * Prepends the base path to an asset path.
 * NEXT_PUBLIC_BASE_PATH is set at build time (e.g. "/mdubs-portfolio").
 * Falls back to "" so local dev (`next dev`) works without a prefix.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
