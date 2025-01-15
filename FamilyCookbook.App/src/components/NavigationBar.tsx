import { Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";

const NavigationBar = () => {
  const { instance } = useMsal();

  const [menuActive, setMenuActive] = useState<boolean>(false);

  const handleWindowResize = () => {
    setMenuActive(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [])

  const handleLogoutRedirect = () => {
    instance.logoutRedirect().catch((error) => console.log(error));
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <button
          onClick={() => setMenuActive((prevState) => !prevState)}
          role="button"
          className={`navbar-burger ${menuActive ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div className={`navbar-menu ${menuActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>

          <Link className="navbar-item" to="/units">
            Units
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Recipes</a>

            <div className="navbar-dropdown">
              <Link className="navbar-item" to="/new-recipe">
                New
              </Link>
              <Link className="navbar-item" to="/recipes">
                Browse
              </Link>
              <hr className="navbar-divider" />

              <div className="navbar-item">
                <p className="is-size-7 has-text-weight-bold">Featured</p>
              </div>
              <Link className="navbar-item" to="/events/event1">
                Event 1
              </Link>
              <Link className="navbar-item" to="/events/event2">
                Event 2
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
                <button className="button" onClick={handleLogoutRedirect}>
                  Sign out
                </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { NavigationBar };
