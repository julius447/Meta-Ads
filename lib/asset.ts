/** basePath fixar INTE råa <img src> — allt statiskt måste gå genom denna. */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const asset = (p: string) => `${BASE}${p.startsWith('/') ? p : `/${p}`}`;
