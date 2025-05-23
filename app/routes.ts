import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('./routes/_index.tsx'),
  route('/sub', './routes/sub_app.tsx'),
  route('*', './routes/404.tsx'),
] satisfies RouteConfig
