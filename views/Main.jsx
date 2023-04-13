const React = require('react');
const Layout = require('./Layout');

module.exports = function Main(props) {
  return (
    <Layout userSession={props.userSession}>
      <div className="main-container">
        <h1>Welcome to CookMate</h1>
      </div>
    </Layout>
  );
};
