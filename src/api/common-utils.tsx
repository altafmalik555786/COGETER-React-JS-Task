import { JWT_AUTH_ACCESS_TOKEN } from "@utils/constants/important";

const AUTH_TOKEN = JWT_AUTH_ACCESS_TOKEN;
export function getJWTAuthToken() {
  return localStorage.getItem(AUTH_TOKEN) || "";
}
export function setTokenIntoCookies(token: string) {
  localStorage.setItem(AUTH_TOKEN, token);
}
export function flushTokenFromCookies() {
  localStorage.removeItem(AUTH_TOKEN);
}
export function getAuthorizationHeader() {
  return `Bearer ${getJWTAuthToken()}`;
}
