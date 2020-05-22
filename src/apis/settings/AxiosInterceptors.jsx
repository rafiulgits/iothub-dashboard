import UserManager from "../../services/UserManager";

export const WithInterceptors = (axios) => {
  axios.interceptors.response.use(
    (res) => {
      console.log("interceptors");
      return res;
    },
    (err) => {
      if (err.response) {
        let status = err.response.status;
        // For unauthorized response we should remove the existing token
        if (status === 401) {
          UserManager.clear();
        }
      }
      return Promise.reject(err);
    }
  );
  return axios;
};
