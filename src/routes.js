import { HomePage, UserPage } from "./views/pages";

const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage
  },
  {
    path: "/users",
    exact: true,
    component: UserPage
  }
];

export default routes;
