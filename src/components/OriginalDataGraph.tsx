import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ogData } from "../common/ogData";
import { formatNumber } from "../common/mapping";

export default function OriginalDataGraph() {
  const chartData = ogData.reverse().map((item) => ({
    ...item,
    label: `${item.month} ${item.year}`,
  }));

  return (
    <div style={{ width: "100%", height: 500 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            angle={-45}
            textAnchor="end"
            interval={4}
            height={70}
          />
          <YAxis />
          <Tooltip
            formatter={(value) => `${formatNumber(value as string)} ₽`}
            labelFormatter={(label) => `Период: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
            name="Цена за м²"
          />
          <Line
            type="monotone"
            dataKey="pay"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
            name="Средняя ЗП"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
