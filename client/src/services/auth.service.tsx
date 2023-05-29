/**
 *
 *
 */

import axios from "axios";
import cookieUtil from "./cookie-util";

const API_URL = "http://localhost:50000/";

class AuthService {
  // login of user to
  async login(username: string, password: string) {
    // fetching credentials from the backend
    const response = await axios.post(API_URL + "login", {
      username: username,
      passwordhash: password,
    });
    // if the browser has a token, delete it
    if (cookieUtil.getAccessTokenCookie() != null) {
      cookieUtil.deleteAccessTokenCookie();
    }
    // if the response has a token, set the cookie
    if (response.data.token ? true : false) {
      cookieUtil.setAccessTokenCookie(response.data.token);
    }
    return response.data;
  }

  // logout of user
  logout() {
    cookieUtil.deleteAccessTokenCookie();
  }

  // register a new user
  register(username: string, email: string, password: string) {
    // creting a new user with the given credentials and sending it to the backend
    return axios.post(API_URL + "register", {
      username: username,
      email: email,
      passwordhash: password,
    });
  }

  getCurrentUser() {
    const userStr = cookieUtil.getAccessTokenCookie();
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
