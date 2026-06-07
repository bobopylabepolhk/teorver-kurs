import { useMemo } from "react";
import type { DivData } from "../common/ogData";
import { mean, variance, coefficientOfVariation } from "../common/stats";
import { StatsBlock } from "../components/StatsBlock";

export default function Page2({ x, y }: DivData) {
  const statsX = useMemo(
    () => ({
      mean: mean(x),
      varBiased: variance(x, false),
      varUnbiased: variance(x, true),
      cv: coefficientOfVariation(x, true),
    }),
    [x],
  );

  const statsY = useMemo(
    () => ({
      mean: mean(y),
      varBiased: variance(y, false),
      varUnbiased: variance(y, true),
      cv: coefficientOfVariation(y, true),
    }),
    [y],
  );

  const chartData = [
    { name: "Среднее", value: statsX.mean, group: "X" },
    { name: "Дисперсия смещ.", value: statsX.varBiased, group: "X" },
    { name: "Дисперсия несмещ.", value: statsX.varUnbiased, group: "X" },
    { name: "Коэф. вариации", value: statsX.cv, group: "X" },
  ];

  const chartDataY = [
    { name: "Среднее", value: statsY.mean, group: "Y" },
    { name: "Дисперсия смещ.", value: statsY.varBiased, group: "Y" },
    { name: "Дисперсия несмещ.", value: statsY.varUnbiased, group: "Y" },
    { name: "Коэф. вариации", value: statsY.cv, group: "Y" },
  ];

  return (
    <div>
      <StatsBlock
        title="Средняя ЗП (X)"
        values={statsX}
        chartData={chartData}
      />
      <StatsBlock
        title="Цена за м² (y)"
        values={statsY}
        chartData={chartDataY}
        showChart
      />
    </div>
  );
}
