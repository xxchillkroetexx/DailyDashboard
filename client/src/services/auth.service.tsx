/**
 * This file is used to communicate with the backend for authentication
 */

import axios from "axios";
import cookieUtil from "./cookie-util";

// url of the backend
const API_URL = "http://localhost:50000/";

// class for authentication
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

  // get the current user
  getCurrentUser() {
    const accessToken = cookieUtil.getAccessTokenCookie();
    // if the browser has a token, return it
    if (accessToken) return accessToken;
    // if the browser does not have a token, return an empty string
    return "";
  }
}

// exporting the AuthService class
export default new AuthService();
