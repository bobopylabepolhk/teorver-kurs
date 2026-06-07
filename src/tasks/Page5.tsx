import { useMemo } from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import type { DivData } from "../common/ogData";
import { correlationTest, mean } from "../common/stats";

export default function Page5({ x, y }: DivData) {
  const result = useMemo(() => correlationTest(x, y), [x, y]);
  const scatter = x.map((v, i) => ({ x: v, y: y[i] }));

  return (
    <div>
      <h2>Коэффициент корреляции Пирсона</h2>

      <div style={{ marginBottom: 16, lineHeight: 1.8 }}>
        <div>
          r: <b>{result.r.toFixed(6)}</b>
        </div>
        <div>
          t: <b>{result.t.toFixed(4)}</b>
        </div>
        <div>
          df: <b>{result.df}</b>
        </div>
        <div>
          p-value: <b>{result.pValue}</b>
        </div>
        <div>
          Вывод: <b>{result.accept ? "H0 не отвергается" : "H0 отвергается"}</b>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" />
          <YAxis dataKey="y" type="number" />
          <Tooltip />
          <Scatter data={scatter} fill="#8884d8" />
          <ReferenceLine x={mean(x)} stroke="#ccc" />
          <ReferenceLine y={mean(y)} stroke="#ccc" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
