/**
 * This is the user service. It is used to get the public content and the user board.
 */

import axios from "axios";
import authHeader from "./auth-header";

// set the API_URL
const API_URL = "http://localhost:50000/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "dashboard"); // TODO display default Dashboard
  }

  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }
}

export default new UserService();
