// import { HomePageDto, ShortNameAvailableRequest, ShortNameAvailableResponse } from "../interfaces";
import { msalInstance } from "../main";

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
  console.log("fetching access token");
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error("No active account");
  }

  const tokenResponse = await msalInstance.acquireTokenSilent({
    scopes: ["api://0b74c7ae-6eba-4d32-a795-78aaf1370162/Requests.All"],
    account
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
  if (options) {
    console.log(options);
  }

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

export async function getWeatherForecast(): Promise<string> {
  return JSON.stringify(await get("api/home/"));
}
