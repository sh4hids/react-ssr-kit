import escapeStringRegexp from "escape-string-regexp";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import routes from "../../routes";

import App from "../../App";

const renderMiddleware = () => (req, res) => {
  let html = req.html;
  const currentRoute = routes.find(route => matchPath(req.url, route));
  const getInitialProps =
    currentRoute.component.getInitialProps &&
    currentRoute.component.getInitialProps({ req, res });

  Promise.resolve(getInitialProps).then(initialData => {
    const routerContext = { initialData };
    const htmlContent = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={routerContext}>
        <App />
      </StaticRouter>
    );
    const htmlReplacements = {
      HTML_CONTENT: htmlContent,
      INITIAL_STATE: JSON.stringify(initialData)
    };

    Object.keys(htmlReplacements).forEach(key => {
      const value = htmlReplacements[key];
      html = html.replace(
        new RegExp("__" + escapeStringRegexp(key) + "__", "g"),
        value
      );
    });

    if (routerContext.url) {
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
      res.redirect(302, routerContext.url);
    } else {
      res.send(html);
    }
  });
};

export default renderMiddleware;
