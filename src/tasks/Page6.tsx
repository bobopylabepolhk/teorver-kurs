import { useMemo } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts";
import type { DivData } from "../common/ogData";
import { regressionLine } from "../common/stats";

export default function Page6({ x, y }: DivData) {
  const { b0, b1 } = useMemo(() => regressionLine(x, y), [x, y]);

  const scatter = x.map((v, i) => ({ x: v, y: y[i] }));
  const minX = Math.min(...x);
  const maxX = Math.max(...x);

  const lineData = [
    { x: minX, y: b0 + b1 * minX },
    { x: maxX, y: b0 + b1 * maxX },
  ];

  return (
    <div>
      <h2>Линейная регрессия Y на X</h2>

      <div style={{ marginBottom: 16, lineHeight: 1.8 }}>
        <div>
          Уравнение:{" "}
          <b>
            Y = {b0.toFixed(4)} + {b1.toFixed(6)}X
          </b>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={420}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" />
          <YAxis dataKey="y" type="number" />
          <Tooltip />
          <Scatter data={scatter} fill="#8884d8" />
          <Line
            data={lineData}
            type="linear"
            dataKey="y"
            stroke="#ff7300"
            dot={false}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
