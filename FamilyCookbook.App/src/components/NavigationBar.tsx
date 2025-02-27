import { Link } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import {
  Button,
  Collapse,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown,
} from "reactstrap";

export const NavigationBar = () => {
  const { instance } = useMsal();

  const [menuActive, setMenuActive] = useState<boolean>(false);

  const handleWindowResize = () => {
    setMenuActive(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleLogoutRedirect = () => {
    instance.logoutRedirect().catch((error) => console.log(error));
  };

  return (
    <Navbar expand="sm">
      <NavbarToggler
        className="ms-auto"
        onClick={() => setMenuActive((prev) => !prev)}
      />
      <Collapse isOpen={menuActive} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </NavItem>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Meals
            </DropdownToggle>
            <DropdownMenu right>
              <Link className="dropdown-item" to="/new-meal">
                New
              </Link>
              <Link className="dropdown-item" to="/meals">
                Browse
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Recipes
            </DropdownToggle>
            <DropdownMenu right>
              <Link className="dropdown-item" to="/new-recipe">
                New
              </Link>
              <Link className="dropdown-item" to="/recipes">
                Browse
              </Link>
            </DropdownMenu>
          </UncontrolledDropdown>

          <NavItem>
            <Link className="nav-link" to="/units">
              Units
            </Link>
          </NavItem>
        </Nav>
        <Button onClick={handleLogoutRedirect}>Sign out</Button>
      </Collapse>
    </Navbar>
  );
};
