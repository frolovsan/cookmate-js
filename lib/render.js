require('@babel/register');

const React = require('react');

const ReactDOMServer = require('react-dom/server');

function render(Component, props, res, req) {
  const reactEl = React.createElement(Component, {
    ...props,
    ...res.app.locals,
    ...res.locals,
    userSession: req.session?.user || '',
  });
  const html = ReactDOMServer.renderToStaticMarkup(reactEl);
  res.send(`<!DOCTYPE html>${html}`);
}

module.exports = render;
