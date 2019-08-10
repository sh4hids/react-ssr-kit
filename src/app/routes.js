import { HomePage, PostPage } from './views/pages';

const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/posts',
    exact: true,
    component: PostPage,
  },
];

export default routes;
