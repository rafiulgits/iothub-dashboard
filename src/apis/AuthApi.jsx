import { Axios } from "./settings/Axios";

export default {
  login: (data) => {
    let endpoint = `https://localhost:5001/api/authentication/login`;
    let body = JSON.stringify(data);
    let config = { headers: { "Content-Type": "application/json" } };
    return Axios.post(endpoint, body, config);
  },
};
