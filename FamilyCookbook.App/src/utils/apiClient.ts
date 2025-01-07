// import { HomePageDto, ShortNameAvailableRequest, ShortNameAvailableResponse } from "../interfaces";
import { msalInstance } from "../main";
import { Unit } from "../interfaces.ts";

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

  const tokenResponse = await msalInstance.acquireTokenSilent({
    scopes: ["api://d165df3d-23bf-488a-9737-d74762acb2c7/.default"],
  });
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

// TODO: REMOVE ONCE POST FUNCTION IS USED
// @ts-ignore
async function post<T, B>(endpoint: string, body: B, options: RequestOptions | null = null): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data: T = await response.json();
  return data;
}

export async function getUnits(): Promise<Unit[]> {
  return await get<Unit[]>("api/units");
}
