import React from "react";
import Layout from "../../shared-components/layout";
import * as SignalR from "@aspnet/signalr";
import UserApi from "../../apis/UserApi";
import HomeView from "./HomeView";

const HubEndpoint = "https://localhost:4001/agenthub";
const MqttClientConnected = "$SYS/users/connected";
const MqttClientDisconnected = "$SYS/users/disconnected";
const HomeTempHumidity = "home/temp-humidity";

export default class HomeContainer extends React.Component {
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
    let hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(HubEndpoint)
      .build();

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

    hubConnection.on("AgentConnectionStatus", this.manageAgentConnection);
    hubConnection.on("Broadcast", this.manageBroadcast);
  };

  manageAgentConnection = (status) => {
    this.setState({ isMqttConnected: status });
  };

  manageBroadcast = (topic, payload) => {
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
      .invoke("MqttClientDisconnectCommand", clientId)
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Layout>
        <HomeView
          users={this.state.connectedUsers}
          messages={this.state.messages}
          clientCloseCallback={this.onClientClose}
          temperature={this.state.temperature}
          humidity={this.state.humidity}
        />
      </Layout>
    );
  }
}
