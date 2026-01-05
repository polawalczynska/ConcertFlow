const ACCESS_TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const REMEMBER_ME_TOKEN_KEY = "rememberMeToken";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function setAccessToken(token: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setRefreshToken(token: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setRememberMeToken(token: string): void {
  if (!isBrowser()) return;
  localStorage.setItem(REMEMBER_ME_TOKEN_KEY, token);
}

export function getRememberMeToken(): string | null {
  if (!isBrowser()) return null;
  return localStorage.getItem(REMEMBER_ME_TOKEN_KEY);
}

export function clearTokens(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(REMEMBER_ME_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  if (!isBrowser()) return false;
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const rememberMeToken = getRememberMeToken();

  if (refreshToken || rememberMeToken) {
    return true;
  }

  return !!accessToken;
}

