import www from "../until/request.js";

export const login = (params) => {
  return www("post", "/user/login", params);
};
