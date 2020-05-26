import React from "react";
import Topics from "./Topics";
import { HubRpc, SysTopics } from "../../navigation/rpc/Common";
import AgentHub from "../../services/AgentHub";
import { Container, Row, Col } from "react-bootstrap";
import { LightCard, TemperatureHumidityCard } from "./Cards";
import { TemperatureChart } from "./Charts";
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
  };

  componentDidMount() {
    let hubConnection = AgentHub.getConnection();

    this.setState({ hubConnection: hubConnection });
    this.subscriptions();
    this.hubConnectionManager(hubConnection);
  }

  subscriptions = () => {
    subscriptionDictionary[
      Topics.HomeTemperatureAndHumidity
    ] = this.handleHomeTemperatureAndHumidity;
    subscriptionDictionary[
      Topics.LivingRoomACStatus
    ] = this.handleLivingRoomACStatus;
    subscriptionDictionary[
      Topics.LivingRoomLightStatus
    ] = this.handleLivingRoomLightStatus;
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
    if (topic === SysTopics.MqttClientConnected) {
      this.manageMqttClientConnected(payload);
    } else if (topic === SysTopics.MqttClientDisconnected) {
      this.handleMqttClientDisconnected(payload);
    } else {
      payload = JSON.parse(payload);
      if (subscriptionDictionary[topic] === undefined) {
        console.log(topic);
      } else {
        subscriptionDictionary[topic](topic, payload);
      }
    }
  };

  manageMqttClientConnected = (clientId) => {};

  handleHomeTemperatureAndHumidity = (topic, payload) => {
    this.setState({
      temperature: payload["temperature"].toFixed(2),
      humidity: payload["humidity"],
    });
  };

  handleLivingRoomACStatus = (topic, payload) => {
    // console.log(payload);
  };

  handleLivingRoomLightStatus = (topic, payload) => {
    this.setState({
      livingRoomLightStatus: payload["status"],
    });
  };

  handleMqttClientDisconnected = (clientId) => {};

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
        <Container>
          <Row className="d-flex justify-content-center m-0 p-0">
            <Col sm={4}>
              <LightCard status={this.state.livingRoomLightStatus} />
            </Col>

            <Col sm={4}>
              <TemperatureHumidityCard
                temperature={this.state.temperature}
                humidity={this.state.humidity}
              />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center m-0 p-0">
            <Col sm={8}>
              <TemperatureChart />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
