import { useEffect, useRef } from "react";
import { createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import { ChartDataPoint } from "@/types/TokenTypes";
import { useTheme } from "next-themes";

export default function WalletPerformanceChart({
  data,
}: {
  data: ChartDataPoint[];
}) {
  const { theme } = useTheme();

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);
  const areaSeries = useRef<ISeriesApi<"Area"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart instance
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        textColor: theme === "dark" ? "white" : "black",
        background: { color: theme === "dark" ? "#1f2937" : "#d1d5db" },
      },
      grid: {
        vertLines: { color: theme === "dark" ? "#374151" : "#9ca3af" },
        horzLines: { color: theme === "dark" ? "#374151" : "#9ca3af" },
      },
    });

    // Store the chart instance
    chartInstance.current = chart;

    // Add area series
    const series = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });

    areaSeries.current = series;

    // Set the data
    series.setData(data);

    // Fit the data to the chart view
    chart.timeScale().fitContent();

    // Cleanup chart on unmount
    return () => {
      chart.remove();
    };
  }, [data]);

  useEffect(() => {
    if (!chartInstance.current) return;

    // Update chart theme when theme changes
    chartInstance.current.applyOptions({
      layout: {
        textColor: theme === "dark" ? "white" : "black",
        background: { color: theme === "dark" ? "#1f2937" : "#d1d5db" },
      },
      grid: {
        vertLines: { color: theme === "dark" ? "#374151" : "#9ca3af" },
        horzLines: { color: theme === "dark" ? "#374151" : "#9ca3af" },
      },
    });
  }, [theme]);

  return (
    <div
      ref={chartContainerRef}
      className="rounded-lg overflow-hidden h-screen w-full"
    />
  );
}
