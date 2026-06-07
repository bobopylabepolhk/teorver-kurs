export function histogram(arr: number[], bins = 8) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const step = (max - min) / bins || 1;

  const res = Array.from({ length: bins }, (_, i) => ({
    left: min + i * step,
    right: min + (i + 1) * step,
    count: 0,
  }));

  arr.forEach((v) => {
    let idx = Math.floor((v - min) / step);
    if (idx === bins) idx = bins - 1;
    res[idx].count += 1;
  });

  return res.map((b) => ({
    name: `${Math.round(b.left)}-${Math.round(b.right)}`,
    count: b.count,
    left: b.left,
    right: b.right,
  }));
}

export function formatNumber(value: string | number) {
  return Number(value).toLocaleString("ru-RU", {
    maximumFractionDigits: 2,
  });
}
