import axios from "axios";
import UserManager from "../../services/UserManager";
import { WithInterceptors } from "./AxiosInterceptors";

export const AuthenticateAxios = WithInterceptors(
  axios.create({
    headers: {
      Authorization: `Bearer ${UserManager.getToken()}`,
    },
  })
);

export const Axios = WithInterceptors(axios.create());
