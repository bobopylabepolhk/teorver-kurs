import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { formatNumber } from "../common/mapping";

export type StatData = {
  mean: number;
  varBiased: number;
  varUnbiased: number;
  cv: number;
};

export type ChartMappings = {
  name: string;
  value: number;
  group: string;
}[];

type Props = {
  title: string;
  values: StatData;
  chartData: ChartMappings;
  showChart?: boolean;
};

export function StatsBlock({
  title,
  values,
  chartData,
  showChart = false,
}: Props) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2>{title}</h2>

      <div style={{ marginBottom: 16, lineHeight: 1.8 }}>
        <div>
          Выборочное среднее: <b>{formatNumber(values.mean)}</b>
        </div>
        <div>
          Дисперсия смещённая: <b>{formatNumber(values.varBiased)}</b>
        </div>
        <div>
          Дисперсия несмещённая: <b>{formatNumber(values.varUnbiased)}</b>
        </div>
        <div>
          Коэффициент вариации: <b>{formatNumber(values.cv)}%</b>
        </div>
      </div>

      {showChart && (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
