const React = require('react');
const Navbar = require('./Navbar');

function Layout(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/style.css" />
        <title>CookMate</title>
      </head>
      <body>
        <Navbar userSession={props.userSession} />
        {props.children}
      </body>
    </html>
  );
}

module.exports = Layout;
