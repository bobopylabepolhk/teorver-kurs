import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { ecdf } from "../common/stats";
import { histogram } from "../common/mapping";
import type { DivData } from "../common/ogData";

export default function Page1({ x, y }: DivData) {
  const histX = useMemo(() => histogram(x, 8), [x]);
  const ecdfX = useMemo(() => ecdf(x), [x]);
  const histY = useMemo(() => histogram(y, 8), [y]);
  const ecdfY = useMemo(() => ecdf(y), [y]);

  return (
    <div>
      <h2>X: гистограмма</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={histX}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2>X: эмпирическая функция распределения</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={ecdfX}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Line type="stepAfter" dataKey="F" stroke="#82ca9d" dot={false} />
        </LineChart>
      </ResponsiveContainer>

      <h2>Y: гистограмма</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={histY}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Y: эмпирическая функция распределения</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={ecdfY}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Line type="stepAfter" dataKey="F" stroke="#ff7300" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
