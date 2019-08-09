import configureStore from "../../app/state/store";

const storeMiddleware = () => (req, res, next) => {
  const store = configureStore({});
  req.store = store;
  next();
};

export default storeMiddleware;
