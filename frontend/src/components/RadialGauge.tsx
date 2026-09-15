import React from "react";

interface RadialGaugeProps {
  value: number; // 0 to 10 or 0 to 100
  max?: number;
  label: string;
  sublabel?: string;
  size?: number;
  strokeWidth?: number;
  colorTheme?: "red" | "amber" | "indigo" | "emerald" | "purple";
  formatter?: (val: number) => string;
}

const colorMap = {
  red: {
    stroke: "#ef4444",
    bgStroke: "#450a0a",
    text: "text-red-400",
    glow: "drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]",
  },
  amber: {
    stroke: "#f59e0b",
    bgStroke: "#451a03",
    text: "text-amber-400",
    glow: "drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]",
  },
  indigo: {
    stroke: "#6366f1",
    bgStroke: "#1e1b4b",
    text: "text-indigo-400",
    glow: "drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]",
  },
  emerald: {
    stroke: "#10b981",
    bgStroke: "#064e3b",
    text: "text-emerald-400",
    glow: "drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]",
  },
  purple: {
    stroke: "#a855f7",
    bgStroke: "#3b0764",
    text: "text-purple-400",
    glow: "drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]",
  },
};

export const RadialGauge: React.FC<RadialGaugeProps> = ({
  value,
  max = 10,
  label,
  sublabel,
  size = 68,
  strokeWidth = 6,
  colorTheme = "indigo",
  formatter,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value / max, 0), 1);
  const strokeDashoffset = circumference - progress * circumference;
  const theme = colorMap[colorTheme] || colorMap.indigo;

  const displayVal = formatter ? formatter(value) : value.toFixed(1);

  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className={`rotate-[-90deg] ${theme.glow}`}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.bgStroke}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xs font-extrabold font-mono ${theme.text}`}>
            {displayVal}
          </span>
        </div>
      </div>

      <span className="mt-1 text-[10px] uppercase font-semibold text-slate-400 text-center tracking-wider">
        {label}
      </span>
      {sublabel && (
        <span className="text-[9px] text-slate-500 text-center font-mono">
          {sublabel}
        </span>
      )}
    </div>
  );
};
