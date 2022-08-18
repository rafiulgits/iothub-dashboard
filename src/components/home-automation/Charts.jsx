import React from "react";
import Chart from "react-apexcharts";

export let TemperatureLogs = [];

export const TemperatureChart = (props) => {
  let tempValues = TemperatureLogs.flatMap((i) => i.value);
  let tempLabels = TemperatureLogs.flatMap((i) => i.dateTime);

  let options = {
    chart: {
      id: "realtime",
      height: 300,
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Temperature",
      align: "center",
    },
    markers: {
      size: 0,
    },

    xaxis: {
      range: 10,
      categories: tempLabels,
      labels: { show: false },
    },
    yaxis: {
      max: 50,
      min: 20,
      tickAmount: 15,
      forceNiceScale: true,
      decimalsInFloat: 2,
    },
    legend: {
      show: false,
    },
  };

  let series = [
    {
      name: "series-1",
      data: tempValues,
    },
  ];

  return (
    <div className="shadow p-3">
      <Chart options={options} series={series} type="line" />
    </div>
  );
};
