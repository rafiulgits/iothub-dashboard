import { Axios } from "./settings/Axios";

const BaseEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/api`;

export default {
  login: (data) => {
    let endpoint = `${BaseEndpoint}/authentication/login`;
    let body = JSON.stringify(data);
    let config = { headers: { "Content-Type": "application/json" } };
    return Axios.post(endpoint, body, config);
  },
};
