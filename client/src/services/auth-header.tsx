/**
 * @module authHeader
 * @returns {string} - returns the token from the local storage
 * @description - This function returns the token from the local storage
 */

export default function authHeader() {
  // get the user from the local storage
  const userStr = localStorage.getItem("user");
  let user = null;
  // if there is a user, parse the user
  if (userStr) user = JSON.parse(userStr);

  // if the user and the user's token exist, return the token
  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    // if the user and the user's token do not exist, return null
    return { "x-access-token": null };
  }
}
