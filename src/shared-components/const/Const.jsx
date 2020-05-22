export const Config = Object.freeze({
  HubEndpoint: `https://localhost:4001/agenthub`,
});

export const HubRpc = Object.freeze({
  MqttBroadcast: "Broadcast",
  AgentMqttConnectionStatus: "AgentConnectionStatus",
  Disconnect: "disconnect",
  InvokeMqttBroker: "RequestMqttBroker",
});

export const SysTopics = Object.freeze({});
