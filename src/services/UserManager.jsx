export default {
  getToken: () => {
    return localStorage.getItem("Bearer_Token");
  },

  setToken: (token) => {
    localStorage.setItem("Bearer_Token", token);
  },

  hasToken: () => {
    return !!localStorage.getItem("Bearer_Token");
  },

  clear: () => {
    localStorage.clear();
  },
};
