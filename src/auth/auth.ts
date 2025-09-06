
export function setLoggedIn(isLoggedIn: boolean) {
  localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
}

export function getLoggedIn() {
  const value = localStorage.getItem("isLoggedIn");
  return value ? JSON.parse(value) : false;
}

export function clearAuth() {
  localStorage.removeItem("isLoggedIn");
}
