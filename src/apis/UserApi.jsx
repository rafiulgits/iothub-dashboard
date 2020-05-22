import { AuthenticateAxios } from "./settings/Axios";

const BaseEndpoint = "https://localhost:5001/api/users";

export default {
  getConnectedUsers: () => {
    let endpoint = `${BaseEndpoint}/connected`;
    return AuthenticateAxios.get(endpoint, null, null);
  },

  getById: (id) => {
    let endpoint = `${BaseEndpoint}/${id}`;
    return AuthenticateAxios.get(endpoint, null, null);
  },
};
