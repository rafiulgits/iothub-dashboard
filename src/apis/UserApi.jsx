import { AuthenticateAxios } from "./settings/Axios";

const BaseEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/api/users`;

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
