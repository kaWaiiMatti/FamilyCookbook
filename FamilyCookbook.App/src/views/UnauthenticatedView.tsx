import { loginRequest } from "../authConfig.ts";
import { useMsal } from "@azure/msal-react";
import '../css/unauthenticated.css'

export const UnauthenticatedView = () => {
  const { instance } = useMsal();

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  return <div className="unauthenticated-container">
      <button className="button" onClick={handleLoginRedirect}>
      Sign in
    </button>
  </div>
}
