import moment from "moment";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./lineCharts.css";
import { IWoundAssesmentsMap } from "../orderOverview/orderOverview.interface";

type Props = {
  assesmentList: IWoundAssesmentsMap[];
  interval: number;
};

const LineCharts = ({ assesmentList, interval }: Props) => {
  function formatXAxis(tickItem: any) {
    return moment(tickItem).format("MM/DD/YYYY").valueOf();
  }

  return (
    <>
      {assesmentList && (
        <ResponsiveContainer width="70%" minHeight="50%" aspect={3}>
          <LineChart
            data={assesmentList}
            margin={{
              top: 10,
              right: 50,
              left: 20,
              bottom: 65,
            }}
          >
            <CartesianGrid horizontal={true} vertical={false} />
            <XAxis
              dataKey="evaluationDate"
              name="Measurment Date"
              domain={["auto", "auto"]}
              textAnchor="end"
              angle={-30}
              tick={{ fontSize: "12px" }}
              minTickGap={-2}
              interval={interval}
              dy={5}
              tickFormatter={formatXAxis}
              label={{
                value: `Date Of Measurment`,
                fill: "#323234",
                style: {
                  textAnchor: "middle",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "16px",
                },
                angle: -360,
                position: "bottom",
                offset: 45,
              }}
            />
            <YAxis
              allowDecimals={false}
              interval={"preserveEnd"}
              name="Wound Volumne"
              tickSize={0}
              tick={{ fontSize: "12px" }}
              dx={-5}
              label={{
                value: "Wound volume (cm³)",
                fill: "#323234",
                style: {
                  textAnchor: "middle",
                  fontStyle: "normal",
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "16px",
                },
                angle: -90,
                position: "left",
                offset: -10,
              }}
            ></YAxis>

            <Tooltip
              cursor={false}
              formatter={(value, label) => value + " cm³"}
              separator="       "
              label={""}
              labelFormatter={(t) => moment(t).format("MM/DD/YYYY").valueOf()}
            />
            <Line
              dataKey="Volume"
              stroke="#0049BD"
              fill="#1E64D0"
              strokeWidth={1.5}
              dot={{
                stroke: "#1E64D0",
                r: 5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default LineCharts;
