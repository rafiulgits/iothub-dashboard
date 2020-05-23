import * as SignalR from "@aspnet/signalr";
import UserManager from "../services/UserManager";

export default class AgentHub {
  connection;

  static getConnection = () => {
    if (this.connection == null) {
      let endpoint = `${
        process.env.REACT_APP_SIGNALR_HUB_ENDPOINT
      }?access_token=${UserManager.getToken()}`;
      this.connection = new SignalR.HubConnectionBuilder()
        .withUrl(endpoint)
        .build();
    }
    return this.connection;
  };
}
