import React from "react";
import escapeStringRegexp from "escape-string-regexp";
import ReactDOMServer from "react-dom/server";
import serialize from "serialize-javascript";
import { Provider as ReduxProvider } from "react-redux";
import { StaticRouter, matchPath } from "react-router-dom";
import { ServerStyleSheet } from "styled-components";
import routes from "../../app/routes";
import App from "../../app";

const renderMiddleware = () => (req, res) => {
  let html = req.html;
  const store = req.store;
  const sheet = new ServerStyleSheet();
  const currentRoute = routes.find(route => matchPath(req.url, route));
  const getInitialProps =
    currentRoute.component.getInitialProps &&
    currentRoute.component.getInitialProps({ req, res });

  Promise.resolve(getInitialProps).then(initialData => {
    const routerContext = { initialData };
    const htmlContent = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <ReduxProvider store={store}>
          <StaticRouter location={req.url} context={routerContext}>
            <App />
          </StaticRouter>
        </ReduxProvider>
      )
    );
    const htmlReplacements = {
      HTML_CONTENT: htmlContent,
      STYLE_TAGS: sheet.getStyleTags(),
      PRELOADED_STATE: serialize(store.getState(), { isJSON: true })
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
