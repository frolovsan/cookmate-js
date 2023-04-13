const React = require('react');

module.exports = function Navbar({ userSession }) {
  return (
    <nav className="navbar">
      {userSession ? (
        <>
          <a className="logo" href="/">CookMate</a>
          <ul className="nav-links">
            <div className="menu">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                {' '}
                <a href="/profile">
                  Hi,
                  {' '}
                  {userSession}
                </a>
              </li>
              <li>
                <a href="/auth/logout">Logout</a>
              </li>
            </div>
          </ul>
        </>
      ) : (
        <>
          <a className="logo" href="/">CookMate</a>
          <ul className="nav-links">
            <div className="menu">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                {' '}
                <a href="/auth/login">Log in</a>
              </li>
              <li>
                <a href="/auth/register">Register</a>
              </li>
            </div>
          </ul>
        </>
      )}
    </nav>
  );
};
