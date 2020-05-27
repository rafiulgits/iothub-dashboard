export const HubRpc = Object.freeze({
  MqttBroadcast: "Broadcast",
  AgentMqttConnectionStatus: "AgentConnectionStatus",
  Disconnect: "disconnect",
  InvokeMqttBroker: "RequestMqttBroker",
});

export const SysTopics = Object.freeze({
  MqttClientConnected: "$SYS/broker/clients/connected/new",
  MqttClientDisconnected: "$SYS/broker/clients/disconnected/new",
  RequestToDisconnectMqttClient:
    "$SYS/request/broker/clients/disconnect/command",
});
