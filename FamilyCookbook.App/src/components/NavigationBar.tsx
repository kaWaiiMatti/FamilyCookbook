import { Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";

const NavigationBar = () => {
  const { instance } = useMsal();

  const [menuActive, setMenuActive] = useState<boolean>(false);

  const handleWindowResize = () => {
    setMenuActive(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleLogoutRedirect = () => {
    instance.logoutRedirect().catch((error) => console.log(error));
  };

  return (
    <Navbar expand="sm">
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">
              GitHub
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarText>Simple Text</NavbarText>
      </Collapse>
    </Navbar>
  );

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <button
          onClick={() => setMenuActive((prevState) => !prevState)}
          role="button"
          className={`navbar-burger ${menuActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div className={`navbar-menu ${menuActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Meals</a>

            <div className="navbar-dropdown">
              <Link className="navbar-item" to="/new-meal">
                New
              </Link>
              <Link className="navbar-item" to="/meals">
                Browse
              </Link>
            </div>
          </div>

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

          <Link className="navbar-item" to="/units">
            Units
          </Link>
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
