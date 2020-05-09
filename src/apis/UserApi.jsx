import axios from "axios";

const BaseEndpoint = "https://localhost:5001/api/users";

export default {
  getConnectedUsers: () => {
    let endpoint = `${BaseEndpoint}/connected`;
    return axios.get(endpoint, null, null);
  },

  getById: (id) => {
    let endpoint = `${BaseEndpoint}/${id}`;
    return axios.get(endpoint, null, null);
  },
};
