function setAccessTokenCookie(accessToken: string) {
  // Define the cookie name
  var cookieName = "x-access-token";

  // Define the cookie value
  var cookieValue = accessToken;

  // Define the number of days the cookie will be valid
  var expiryDays = 1;

  // Calculate the expiration date
  var expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays);

  // Format the expiration date in UTC string format
  var expires = expiryDate.toUTCString();

  // Create the cookie string
  var cookieString =
    encodeURIComponent(cookieName) +
    "=" +
    encodeURIComponent(cookieValue) +
    ";expires=" +
    expires +
    ";path=/";

  // Set the cookie
  document.cookie = cookieString;
}

/**
 * This function searches for the x-access-token cookie in the document.cookie string,
 * extracts its value, and returns it. If the cookie is not found, it returns null.
 */
function getAccessTokenCookie() {
  var name = "x-access-token" + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

/**
 * This function sets the x-access-token cookie to expire in the past,
 * effectively deleting it from the browser.
 * By setting the expiration date to a date in the past,
 * the browser removes the cookie.
 */
function deleteAccessTokenCookie() {
  document.cookie =
    "x-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export default {
  setAccessTokenCookie,
  getAccessTokenCookie,
  deleteAccessTokenCookie,
};
