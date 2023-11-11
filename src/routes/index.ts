/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import config from '../utils/config';
import adminRouter from '../modules/admin/admin.route';
const router = express.Router();

const defaultRoutes = [
  {
    path: '/admin',
    route: adminRouter.adminRouter,
  },
];

defaultRoutes.forEach(route => {
  const apis = route.route.stack.map((path: any) => {
    return { path: path.route.path, methods: path.route.methods };
  });
  apis.map((api: any) => {
    console.log([
      api.methods,
      {
        route: `${config.server_url}${config.api_route}${route.path}${api.path}`,
      },
    ]);
  });

  router.use(route.path, route.route);
});

export default router;
