import React from "react";

import { useList } from "@refinedev/core";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";

import { DollarOutlined } from "@ant-design/icons";
import { Area, type AreaConfig } from "@ant-design/plots";
import { Card } from "antd";

import { Text } from "@/components";
import type { DashboardDealsChartQuery } from "@/graphql/types";

import { DASHBOARD_DEALS_CHART_QUERY } from "./queries";
import { mapDealsData } from "./utils";

export const DashboardDealsChart = () => {
  const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    resource: "dealStages",
    filters: [{ field: "title", operator: "in", value: ["WON", "LOST"] }],
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
    },
  });

  const dealData = React.useMemo(() => {
    return mapDealsData(data?.data);
  }, [data?.data]);

  const config: AreaConfig = {
    isStack: false,
    data: dealData,
    xField: "timeText",
    yField: "value",
    seriesField: "state",
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
      offsetY: -6,
    },
    yAxis: {
      tickCount: 6,
      label: {
        formatter: (v) => {
          return `R$${Number(v) / 1000}k`;
        },
      },
    },
      xAxis: {
    label: {
      formatter: (value) => {
        // Aqui você pode formatar ou modificar os rótulos do eixo X
        return `${value}`; // Exemplo: apenas retornar o valor original
      },
    },
    tickCount: 6,  // Define o número de ticks no eixo X
    title: {
      text: "Data",  // Adiciona um título ao eixo X
    },
    type: 'time',  // Se você estiver trabalhando com datas, pode usar "time"
    range: [0.01, 1],  // Ajusta o intervalo de exibição no eixo X
  },
    tooltip: {
      formatter: (data) => {
        return {
          name: data.state,
          value: `R$${Number(data.value) / 1000}k`,
        };
      },
    },
    
    areaStyle: (datum) => {
      const won = "l(270) 0:#ffffff 0.5:#b7eb8f 1:#52c41a";
      const lost = "l(270) 0:#ffffff 0.5:#f3b7c2 1:#ff4d4f";
      return { fill: datum.state === "Won" ? won : lost };
    },
    color: (datum) => {
      return datum.state === "Ganhos" ? "#52C41A" : "#F5222D";
    },
  };

  return (
    <Card
      style={{ height: "100%" }}
      headStyle={{ padding: "8px 16px" }}
      bodyStyle={{ padding: "24px 24px 0px 24px" }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <DollarOutlined />
          <Text size="sm" style={{ marginLeft: ".5rem" }}>
            Negócios
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};
