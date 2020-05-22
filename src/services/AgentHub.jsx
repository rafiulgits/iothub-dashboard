import * as SignalR from "@aspnet/signalr";
import UserManager from "../services/UserManager";
import { Config } from "../shared-components/const/Const";

export default class AgentHub {
  connection;

  static getConnection = () => {
    if (this.connection == null) {
      let endpoint = `${
        Config.HubEndpoint
      }?access_token=${UserManager.getToken()}`;
      this.connection = new SignalR.HubConnectionBuilder()
        .withUrl(endpoint)
        .build();
    }
    return this.connection;
  };
}
