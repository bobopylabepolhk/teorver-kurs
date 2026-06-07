import { jStat } from "jstat";

export function ecdf(arr: number[]) {
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted.map((x, i) => ({ x, F: (i + 1) / sorted.length }));
}

export function mean(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function variance(arr: number[], unbiased = true) {
  const m = mean(arr);
  const s = arr.reduce((acc, x) => acc + (x - m) ** 2, 0);
  return s / (unbiased ? arr.length - 1 : arr.length);
}

export function stdDev(arr: number[], unbiased = true) {
  return Math.sqrt(variance(arr, unbiased));
}

export function coefficientOfVariation(arr: number[], unbiased = true) {
  const m = mean(arr);
  const s = stdDev(arr, unbiased);
  return (s / Math.abs(m)) * 100;
}

export function regressionLine(x: number[], y: number[]) {
  const mx = mean(x);
  const my = mean(y);
  const ssxx = x.reduce((acc, xi) => acc + (xi - mx) ** 2, 0);
  const ssxy = x.reduce((acc, xi, i) => acc + (xi - mx) * (y[i] - my), 0);
  const b1 = ssxy / ssxx;
  const b0 = my - b1 * mx;
  return { b0, b1 };
}

export function normalCdf(x: number, mu: number, sigma: number) {
  const z = (x - mu) / (sigma * Math.SQRT2);
  return 0.5 * (1 + erf(z));
}

function erf(x: number) {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  const a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741;
  const a4 = -1.453152027,
    a5 = 1.061405429,
    p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y =
    1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

export function chiSquareNormality(arr: number[], bins = 8) {
  const n = arr.length;
  const mu = mean(arr);
  const sigma = stdDev(arr, true);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const step = (max - min) / bins || 1;

  const observed = Array(bins).fill(0);
  arr.forEach((v) => {
    let idx = Math.floor((v - min) / step);
    if (idx === bins) idx = bins - 1;
    observed[idx]++;
  });

  const data = [];
  let chi2 = 0;

  for (let i = 0; i < bins; i++) {
    const left = min + i * step;
    const right = min + (i + 1) * step;
    const p = normalCdf(right, mu, sigma) - normalCdf(left, mu, sigma);
    const expected = n * p;
    if (expected > 0) chi2 += (observed[i] - expected) ** 2 / expected;
    data.push({
      name: `${Math.round(left)}-${Math.round(right)}`,
      observed: observed[i],
      expected: Number(expected.toFixed(2)),
    });
  }

  const df = bins - 1 - 2;
  const critical = jStat.chisquare.inv(0.95, df);
  const pValue = 1 - jStat.chisquare.cdf(chi2, df);

  return { chi2, df, critical, pValue, accept: chi2 < critical, data };
}

export function pearsonCorrelation(x: number[], y: number[]) {
  const mx = mean(x);
  const my = mean(y);
  let num = 0,
    dx = 0,
    dy = 0;
  for (let i = 0; i < x.length; i++) {
    num += (x[i] - mx) * (y[i] - my);
    dx += (x[i] - mx) ** 2;
    dy += (y[i] - my) ** 2;
  }
  return num / Math.sqrt(dx * dy);
}

export function correlationTest(x: number[], y: number[]) {
  const r = pearsonCorrelation(x, y);
  const n = x.length;
  const t = r * Math.sqrt((n - 2) / (1 - r * r));
  const pValue = 2 * (1 - jStat.studentt.cdf(Math.abs(t), n - 2));
  return { r, t, df: n - 2, pValue, accept: pValue >= 0.05 };
}
