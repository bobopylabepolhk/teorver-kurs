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
import type { DivData } from "../common/ogData";

export default function Page3({ x, y }: DivData) {
  const resultY = useMemo(() => chiSquareNormality(y, 8), [y]);
  const resultX = useMemo(() => chiSquareNormality(x, 5), [x]);

  return (
    <div>
      <h2>Цена за м²: проверка нормальности</h2>

      <div style={{ marginBottom: 16, lineHeight: 1.8 }}>
        <div>
          χ²: <b>{resultY.chi2.toFixed(4)}</b>
        </div>
        <div>
          Степени свободы: <b>{resultY.df}</b>
        </div>
        <div>
          Критическое значение при α=0.05: <b>{resultY.critical.toFixed(4)}</b>
        </div>
        <div>
          p-value: <b>{resultY.pValue.toFixed(4)}</b>
        </div>
        <div>
          Вывод:{" "}
          <b>
            {resultY.accept
              ? "гипотеза не отвергается"
              : "гипотеза отвергается"}
          </b>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={resultY.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="observed" fill="#8884d8" name="Наблюдаемые" />
          <Bar dataKey="expected" fill="#82ca9d" name="Ожидаемые" />
        </BarChart>
      </ResponsiveContainer>

      <h2>Средняя ЗП: проверка нормальности</h2>

      <div style={{ marginBottom: 16, lineHeight: 1.8 }}>
        <div>
          χ²: <b>{resultX.chi2.toFixed(4)}</b>
        </div>
        <div>
          Степени свободы: <b>{resultX.df}</b>
        </div>
        <div>
          Критическое значение при α=0.05: <b>{resultX.critical.toFixed(4)}</b>
        </div>
        <div>
          p-value: <b>{resultX.pValue}</b>
        </div>
        <div>
          Вывод:{" "}
          <b>
            {resultX.accept
              ? "гипотеза не отвергается"
              : "гипотеза отвергается"}
          </b>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={resultX.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="observed" fill="#c484d8" name="Наблюдаемые" />
          <Bar dataKey="expected" fill="#a0ca82" name="Ожидаемые" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
