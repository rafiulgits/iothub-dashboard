import React from "react";
import Layout from "../../shared-components/layout";
import * as SignalR from "@aspnet/signalr";
import CommandLineView from "./CommandLineView";
import { Config, HubRpc } from "../../shared-components/const";

export default class CommandLineContainer extends React.Component {
  state = {
    isHubConnected: false,
    isMqttConnected: false,
    hubConnection: null,
    messages: [],
  };

  componentDidMount() {
    let hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(Config.HubEndpoint)
      .build();

    this.setState({ hubConnection: hubConnection });
    this.hubConnectionManager(hubConnection);
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

    hubConnection.on(HubRpc.MqttBroadcast, (topic, payload) => {
      let messages = this.state.messages;
      messages.push({ topic: topic, payload: payload });
      this.setState({ messages: messages });
    });
    hubConnection.on(HubRpc.Disconnect, () => {
      this.setState({ isHubConnected: false });
    });
  };

  onInvokeRequest = (data) => {
    if (!this.state.isHubConnected) {
      alert("Hub is not connected");
      return;
    }
    this.state.hubConnection.invoke(
      HubRpc.InvokeMqttBroker,
      data.topic,
      data.payload
    );
  };

  render() {
    return (
      <Layout>
        <CommandLineView
          messages={this.state.messages}
          onInvokeRequest={this.onInvokeRequest}
        />
      </Layout>
    );
  }
}