import React from "react";
import Topics from "./Topics";
import { HubRpc } from "../../navigation/rpc/Common";
import AgentHub from "../../services/AgentHub";
import { Container, Row, Col } from "react-bootstrap";
import { LightCard, ACCard, TemperatureHumidityCard } from "./Cards";
import { TemperatureChart, TemperatureLogs } from "./Charts";
import { ActivationStatus } from "../../models/Common";

var subscriptionDictionary = {};

export default class HomeAutomationContainer extends React.Component {
  state = {
    isHubConnected: false,
    isMqttConnected: false,
    hubConnection: null,
    temperature: 0,
    humidity: 0,
    livingRoomLightStatus: ActivationStatus.OFF,
    livingRoomACStatus: ActivationStatus.OFF,
    livingRoomACTemperatureValue: "N/A",
  };

  componentDidMount() {
    let hubConnection = AgentHub.getConnection();

    this.setState({ hubConnection: hubConnection });
    this.subscriptions();
    this.hubConnectionManager(hubConnection);
  }

  subscriptions = () => {
    subscriptionDictionary[Topics.HomeTemperatureAndHumidity] =
      this.handleHomeTemperatureAndHumidity;
    subscriptionDictionary[Topics.LivingRoomACStatus] =
      this.handleLivingRoomACStatus;
    subscriptionDictionary[Topics.LivingRoomLightStatus] =
      this.handleLivingRoomLightStatus;
  };

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
    payload = JSON.parse(payload);
    if (subscriptionDictionary[topic] === undefined) {
      console.log(topic);
    } else {
      subscriptionDictionary[topic](topic, payload);
    }
  };

  handleHomeTemperatureAndHumidity = (topic, payload) => {
    let temperature = payload["temperature"].toFixed(2);
    TemperatureLogs.push({
      dateTime: new Date().toLocaleString(),
      value: temperature,
    });
    this.setState({
      temperature: temperature,
      humidity: payload["humidity"],
    });
  };

  handleLivingRoomACStatus = (topic, payload) => {
    this.setState({
      livingRoomACStatus: payload["status"],
      livingRoomACTemperatureValue: payload["value"],
    });
  };

  handleLivingRoomLightStatus = (topic, payload) => {
    this.setState({
      livingRoomLightStatus: payload["status"],
    });
  };

  handleLivingRoomLightSwitching = (data) => {
    let requestPayload = JSON.stringify(data);
    this.state.hubConnection
      .invoke(
        HubRpc.InvokeMqttBroker,
        Topics.RequestLivingRoomLightStatusChange,
        requestPayload
      )
      .catch((err) => {
        alert("failed to invoke the light request");
        console.log(err);
      });
  };

  handleLivingRoomACRemote = (data) => {
    let requestPayload = JSON.stringify(data);
    this.state.hubConnection
      .invoke(
        HubRpc.InvokeMqttBroker,
        Topics.RequestLivingRoomACStatusChange,
        requestPayload
      )
      .catch((err) => {
        alert("failed to invoke the ac request");
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row className="d-flex justify-content-center m-0 p-0">
            <Col sm={4}>
              <LightCard
                status={this.state.livingRoomLightStatus}
                switchCallback={this.handleLivingRoomLightSwitching}
              />
            </Col>

            <Col sm={4}>
              <TemperatureHumidityCard
                temperature={this.state.temperature}
                humidity={this.state.humidity}
              />
            </Col>

            <Col sm={4}>
              <ACCard
                status={this.state.livingRoomACStatus}
                value={this.state.livingRoomACTemperatureValue}
                remoteCallback={this.handleLivingRoomACRemote}
              />
            </Col>
          </Row>
          <Row className="p-0 mb-3 mt-3">
            <Col sm={8}>
              <TemperatureChart />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
