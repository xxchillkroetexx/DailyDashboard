/**
 *
 *
 */

import axios from "axios";

const API_URL = "http://localhost:50000/";

class AuthService {
  // login of user to
  async login(username: string, password: string) {
    const response = await axios.post(API_URL + "login", {
      username: username,
      passwordhash: password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "register", {
      username: username,
      email: email,
      passwordhash: password,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
