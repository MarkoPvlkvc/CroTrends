"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PostgrestError } from "@supabase/supabase-js";
import { format } from "date-fns";
import { TermData } from "@/interfaces/interfaces";
import { LoaderCircle } from "lucide-react";

interface GraphProps {
  terms: TermData[];
  loading: boolean;
  error: PostgrestError | null;
  activeLines: number;
}

const dateFormatter = (date: string) => {
  return format(new Date(date), "dd.MM.yyyy");
};

const Graph = ({ terms, loading, error, activeLines }: GraphProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lineStrokeWidth, setLineStrokeWidth] = useState(5);
  const [dotRadius, setDotRadius] = useState(8);
  const [activeDotStrokeWidth, setActiveDotStrokeWidth] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md: 768px and above
        setLineStrokeWidth(5);
        setDotRadius(8);
        setActiveDotStrokeWidth(3);
      } else {
        setLineStrokeWidth(3);
        setDotRadius(4);
        setActiveDotStrokeWidth(2);
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      const timeoutId = setTimeout(() => {
        setIsLoaded(true);
      }, 250); // Small delay to ensure smooth transition

      return () => clearTimeout(timeoutId);
    }
  }, [loading]);

  if (loading || !isLoaded)
    return (
      <LoaderCircle className="size-9 animate-spin stroke-white stroke-[2px] md:size-12" />
    );
  if (error)
    return <div className="text-2xl font-bold">Error: {error.message}</div>;

  return (
    <ResponsiveContainer className="h-full w-full">
      <LineChart
        width={500}
        height={300}
        data={terms}
        margin={{ top: 0, right: 0, left: -32, bottom: 0 }}
      >
        <defs>
          <linearGradient
            id="verticalLines"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="rgba(106, 107, 109, 0)" />
            <stop offset="15%" stopColor="rgba(106, 107, 109, 0)" />
            <stop offset="100%" stopColor="rgba(106, 107, 109, 1)" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="rgba(255,222,189,1)" />
            <stop offset="50%" stopColor="rgba(255,140,188,1)" />
            <stop offset="100%" stopColor="rgba(171,134,211,1)" />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="0"
          stroke="url(#verticalLines)"
          strokeWidth={3}
          strokeLinecap="round"
          horizontal={false}
        />
        <XAxis
          dataKey="period"
          axisLine={false}
          tickLine={false}
          tickFormatter={dateFormatter}
          padding={{ left: 32, right: 32 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          padding={{ top: 32, bottom: 32 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2023",
            border: "solid 2px rgba(235, 236, 239, 0.1)",
            borderRadius: "24px",
            padding: "16px",
          }}
          labelFormatter={dateFormatter}
          animationEasing="ease-out"
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="Series A"
          stroke={`${activeLines > 1 ? "#FFDEBD" : "url(#lineGradient)"}`}
          strokeWidth={lineStrokeWidth}
          fill="#EBECEF"
          dot={{ r: dotRadius, strokeWidth: 0 }}
          activeDot={{
            fill: "#1f2023",
            stroke: "#EBECEF",
            r: dotRadius,
            strokeWidth: activeDotStrokeWidth,
          }}
        />

        {activeLines > 1 && (
          <Line
            connectNulls
            type="monotone"
            dataKey="Series B"
            stroke="#FF8CBC"
            strokeWidth={lineStrokeWidth}
            fill="#EBECEF"
            dot={{ r: dotRadius, strokeWidth: 0 }}
            activeDot={{
              fill: "#1f2023",
              stroke: "#EBECEF",
              r: dotRadius,
              strokeWidth: activeDotStrokeWidth,
            }}
          />
        )}

        {activeLines > 2 && (
          <Line
            connectNulls
            type="monotone"
            dataKey="Series C"
            stroke="#AB86D3"
            strokeWidth={lineStrokeWidth}
            fill="#EBECEF"
            dot={{ r: dotRadius, strokeWidth: 0 }}
            activeDot={{
              fill: "#1f2023",
              stroke: "#EBECEF",
              r: dotRadius,
              strokeWidth: activeDotStrokeWidth,
            }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
