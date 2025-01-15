// import { HomePageDto, ShortNameAvailableRequest, ShortNameAvailableResponse } from "../interfaces";
import { msalInstance } from "../main";
import { NewRecipeRequest, Recipe, Unit } from "../interfaces.ts";
import { loginRequest } from "../authConfig.ts";
import { AuthenticationResult, InteractionRequiredAuthError } from "@azure/msal-browser";

// TODO: FIX THIS FILE

type RequestOptions = {};

const defaultHeaders = {
  "Content-Type": "application/json"
};

async function get<T>(endpoint: string, options: RequestOptions | null = null): Promise<T> {
  if (options) {
    console.log(options);
  }

  const headers: HeadersInit = { ...defaultHeaders };
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error("No active account");
  }

  const tokenRequest = {
    scopes: ["api://d165df3d-23bf-488a-9737-d74762acb2c7/.default"],
  };
  let tokenResponse: AuthenticationResult;
  try {
    tokenResponse = await msalInstance.acquireTokenSilent(tokenRequest);
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      // If silent acquisition fails, require interactive login

      //const loginResponse =
      await msalInstance.loginPopup(loginRequest);
      // Acquire token after interactive login
      tokenResponse = await msalInstance.acquireTokenSilent(tokenRequest);
    } else {
      throw error;
    }
  }
  headers["Authorization"] = `Bearer ${tokenResponse.accessToken}`;


  const response = await fetch(endpoint, {
    method: "GET",
    headers: headers
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

async function post<T, B>(endpoint: string, body: B): Promise<T> {
  const headers: HeadersInit = { ...defaultHeaders };

  const tokenResponse = await msalInstance.acquireTokenSilent({
    scopes: ["api://d165df3d-23bf-488a-9737-d74762acb2c7/.default"],
  });
  headers["Authorization"] = `Bearer ${tokenResponse.accessToken}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export async function createRecipe(request: NewRecipeRequest): Promise<Recipe> {
  return await post<Recipe, NewRecipeRequest>("api/recipes", request);
}

export async function getRecipes(): Promise<Recipe[]> {
  return await get<Recipe[]>("api/recipes");
}

export async function getUnits(): Promise<Unit[]> {
  return await get<Unit[]>("api/units");
}
