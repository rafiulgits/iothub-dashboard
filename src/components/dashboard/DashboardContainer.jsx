import React from "react";
import Layout from "../../shared-components/layout/Layout";
import AgentHub from "../../services/AgentHub";
import HomeAutomation from "../home-automation";

import { Tab, Row, Col, Nav } from "react-bootstrap";

export default class DashboardContainer extends React.Component {
  state = {
    isHubConnected: false,
    isMqttConnected: false,
    hubConnection: null,
  };

  componentDidMount() {
    let hubConnection = AgentHub.getConnection();
    this.setState({ hubConnection: hubConnection });
    hubConnection
      .start()
      .then(() => {
        this.setState({ isHubConnected: true, hubConnection: hubConnection });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <Layout>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Home Automation System</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Supply Chain Management</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <HomeAutomation />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <h1>World</h1>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Layout>
    );
  }
}
