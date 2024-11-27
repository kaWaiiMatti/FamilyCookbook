import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./css/bulma.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import { msalConfig } from "./authConfig.ts";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/hello",
        element: <p>world</p>,
      },
    ],
  },
]);

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  // Default to using the first account if no account is active on page load
  if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    /* @ts-ignore */
    msalInstance.setActiveAccount(msalInstance.getActiveAccount()[0]);
  }

  // Listen for sign-in event and set active account
  msalInstance.addEventCallback((event) => {
    /* @ts-ignore */
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      /* @ts-ignore */
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
    }
  });
});



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <RouterProvider router={router} />
    </MsalProvider>
  </StrictMode>
);
