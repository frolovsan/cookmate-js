const React = require('react');
const Layout = require('./Layout');

module.exports = function UserRegister() {
  return (
    <Layout>
      <div className="formDiv">
        <form className="logForm" name="registerForm">
          <h5 className="msg"> </h5>
          <br />
          <input type="text" name="name" placeholder="username" />
          <br />
          <input type="email" name="email" placeholder="email" />
          <br />
          <input type="password" name="password" placeholder="password" />
          <br />
          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
        <script defer src="/js/reg.js" />
      </div>
    </Layout>
  );
};
