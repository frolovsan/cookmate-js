const React = require('react');
const Layout = require('./Layout');

module.exports = function UserLogin() {
  return (
    <Layout>
      <script defer src="/js/login.js" />
      <div className="formDiv">
        <form className="logForm" name="loginForm">
          <br />
          <input type="email" name="email" placeholder="email" />
          <br />
          <input type="password" name="password" placeholder="password" />
          <br />
          <button className="loginButton" type="submit">
            Log in
          </button>
        </form>
        <h3 className="msg"></h3>
      </div>
    </Layout>
  );
};
