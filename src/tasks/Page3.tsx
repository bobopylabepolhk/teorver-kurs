import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { chiSquareNormality } from "../common/stats";

type Props = {
  prices: number[];
};

export default function Page3({ prices }: Props) {
  const result = useMemo(() => chiSquareNormality(prices, 8), [prices]);

  return (
    <div>
      <h2>Цена за м²: проверка нормальности</h2>

      <div style={{ marginBottom: 16, lineHeight: 1.8 }}>
        <div>
          χ²: <b>{result.chi2.toFixed(4)}</b>
        </div>
        <div>
          Степени свободы: <b>{result.df}</b>
        </div>
        <div>
          Критическое значение при α=0.05: <b>{result.critical.toFixed(4)}</b>
        </div>
        <div>
          p-value: <b>{result.pValue.toFixed(4)}</b>
        </div>
        <div>
          Вывод:{" "}
          <b>
            {result.accept ? "гипотеза не отвергается" : "гипотеза отвергается"}
          </b>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={result.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="observed" fill="#8884d8" name="Наблюдаемые" />
          <Bar dataKey="expected" fill="#82ca9d" name="Ожидаемые" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
