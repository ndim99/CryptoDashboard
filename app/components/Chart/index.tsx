import { useEffect, useRef } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  ColorType,
} from "lightweight-charts";
import { ChartDataPoint } from "@/types/TokenTypes";

export default function WalletPerformanceChart({
  data,
}: {
  data: ChartDataPoint[];
}) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart instance
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        textColor: "white",
        background: { color: "#1f2937" },
      },
      grid: {
        vertLines: { color: "#374151" },
        horzLines: { color: "#374151" },
      },
    });

    // Store the chart instance
    chartInstance.current = chart;

    // Add area series
    const areaSeries: ISeriesApi<"Area"> = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });

    // Data to display

    areaSeries.setData(data);

    // Fit the data to the chart view
    chart.timeScale().fitContent();

    // Cleanup chart on unmount
    return () => {
      chart.remove();
    };
  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="rounded-lg overflow-hidden h-screen w-full"
    />
  );
}
