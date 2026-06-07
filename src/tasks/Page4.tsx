import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ogData } from "../common/ogData";

export default function Page() {
  const data = ogData.map((p) => ({
    x: p.pay,
    y: p.price,
    month: p.month,
    year: p.year,
  }));

  return (
    <div>
      <h2>Поле корреляции</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" type="number" name="X" />
          <YAxis dataKey="y" type="number" name="Y" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
