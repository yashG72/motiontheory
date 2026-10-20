// Path to a file in /public that works whether the site is served from "/" or a sub-path
export const asset = (path) => import.meta.env.BASE_URL + path;
