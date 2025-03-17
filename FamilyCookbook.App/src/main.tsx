import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/overrides.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import { msalConfig } from "./authConfig.ts";
import {
  AuthenticationResult,
  EventType,
  PublicClientApplication,
} from "@azure/msal-browser";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { RecipesView } from "./views/RecipesView.tsx";
import { UnitsView } from "./views/UnitsView.tsx";
import { UnauthenticatedView } from "./views/UnauthenticatedView.tsx";
import { NewRecipeView } from "./views/NewRecipeView.tsx";
import { NewMealView } from "./views/NewMealView.tsx";
import { NewUnitView } from "./views/NewUnitView.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/new-meal",
        element: <NewMealView />,
      },
      {
        path: "/new-recipe",
        element: <NewRecipeView />,
      },
      {
        path: "/new-unit",
        element: <NewUnitView />,
      },
      {
        path: "/recipes",
        element: <RecipesView />,
      },
      {
        path: "/units",
        element: <UnitsView />,
      },
    ],
  },
]);

/**
 * MSAL should be instantiated outside the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const msalInstance = new PublicClientApplication(msalConfig);

msalInstance.initialize().then(() => {
  // Default to using the first account if no account is active on page load
  const allAccounts = msalInstance.getAllAccounts();
  if (!msalInstance.getActiveAccount() && allAccounts.length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(allAccounts[0]);
  }

  // Listen for sign-in event and set active account
  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <AuthenticatedTemplate>
        <RouterProvider router={router} />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <UnauthenticatedView />
      </UnauthenticatedTemplate>
    </MsalProvider>
  </StrictMode>
);
