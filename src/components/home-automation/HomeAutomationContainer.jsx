import React from "react";
import UserApi from "../../apis/UserApi";
import HomeAutomationView from "./HomeAutomationView";
import { HubRpc } from "../../navigation/rpc/Common";
import AgentHub from "../../services/AgentHub";

const MqttClientConnected = "$SYS/broker/clients/connected/new";
const MqttClientDisconnected = "$SYS/broker/clients/disconnected/new";
const HomeTempHumidity = "home/temp-humidity";

export default class HomeAutomationContainer extends React.Component {
  state = {
    isHubConnected: false,
    isMqttConnected: false,
    hubConnection: null,
    connectedUsers: [],
    messages: [],
    temperature: 0,
    humidity: 0,
  };

  componentDidMount() {
    let hubConnection = AgentHub.getConnection();

    this.setState({ hubConnection: hubConnection });
    this.hubConnectionManager(hubConnection);
    this.fetchConnectedUser();
  }

  hubConnectionManager = (hubConnection) => {
    hubConnection
      .start()
      .then(() => {
        this.setState({ isHubConnected: true });
      })
      .catch((err) => {
        console.error(err);
      });

    hubConnection.on(
      HubRpc.AgentMqttConnectionStatus,
      this.manageAgentConnection
    );
    hubConnection.on(HubRpc.MqttBroadcast, this.manageBroadcast);
  };

  manageAgentConnection = (status) => {
    this.setState({ isMqttConnected: status });
  };

  manageBroadcast = (topic, payload) => {
    console.log(topic);
    if (topic === MqttClientConnected) {
      this.manageMqttClientConnected(payload);
    } else if (topic === MqttClientDisconnected) {
      this.manageMqttClientDisconnected(payload);
    } else if (topic === HomeTempHumidity) {
      this.manageTemperature(payload);
    } else {
      let messages = this.state.messages;
      messages.push({ topic: topic, payload: payload });
      this.setState({ messages: messages });
    }
  };

  manageMqttClientConnected = (clientId) => {
    UserApi.getById(clientId)
      .then((res) => {
        let users = this.state.connectedUsers;
        users.push(res.data);
        this.setState({ connectedUsers: users });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  manageTemperature = (payload) => {
    var data = JSON.parse(payload);
    this.setState({
      temperature: data["temperature"],
      humidity: data["humidity"],
    });
  };

  manageMqttClientDisconnected = (clientId) => {
    let users = this.state.connectedUsers;
    let index = users.findIndex((u) => u.id === clientId);
    if (index > -1) {
      users.splice(index, 1);
      this.setState({ connectedUsers: users });
    }
  };

  fetchConnectedUser = () => {
    UserApi.getConnectedUsers()
      .then((res) => {
        this.setState({ connectedUsers: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  onClientClose = (clientId) => {
    this.state.hubConnection
      .invoke(
        HubRpc.InvokeMqttBroker,
        "$SYS/request/broker/clients/disconnect/command",
        clientId
      )
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <HomeAutomationView
          users={this.state.connectedUsers}
          messages={this.state.messages}
          clientCloseCallback={this.onClientClose}
          temperature={this.state.temperature}
          humidity={this.state.humidity}
        />
      </React.Fragment>
    );
  }
}
