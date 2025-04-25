export const apiUrl = "http://127.0.0.1:8000/api";

export const adminToken = () => {
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
  return adminInfo ? adminInfo.token : null;
}

export const userToken = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo ? userInfo.token : null;
}