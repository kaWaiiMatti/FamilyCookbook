import { loginRequest } from "../authConfig.ts";
import { useMsal } from "@azure/msal-react";
import "../css/unauthenticated.css";
import { Button } from "reactstrap";

export const UnauthenticatedView = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((error) => console.log(error));
  };

  return (
    <div className="unauthenticated-container">
      <Button color="primary" onClick={handleLogin}>
        Sign in
      </Button>
    </div>
  );
};
