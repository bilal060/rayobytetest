import React, { useEffect, useState } from "react";
import classNames from "classnames";

const DEFAULT_COLOR = "#040404";
const DEFAULT_PROGRESS_COLOR = "#0404040A";

interface RadialChartProps {
  className?: string;
  radius?: number;
  strokeWidth?: number;
  color?: string;
  progress?: number;
  dimension?: number;
  progressColor?: string;
}

const RadialChart: React.FC<RadialChartProps> = ({
  radius = 80,
  progress = 100,
  strokeWidth = 10,
  dimension = 180,
  color = DEFAULT_COLOR,
  progressColor = DEFAULT_PROGRESS_COLOR,
}) => {
  const [setStrokeLength, setSetStrokeLength] = useState<boolean>(false);

  useEffect(() => {
    // For initial animation
    setTimeout(() => {
      setSetStrokeLength(true);
    });
  }, []);

  const circleRadius = Math.min(radius, 85);
  const circumference = 2 * Math.PI * circleRadius;
  const strokeLength = setStrokeLength ? (circumference / 100) * progress : 0;

  return (
    <div
      className={classNames("radial-chart", {
        "no-progress": strokeLength === 0,
      })}
    >
      <svg viewBox="0 0 180 180" width={dimension} height={dimension}>
        <circle
          className="radial-chart-total"
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          cx="90"
          cy="90"
          r={circleRadius}
        />
        <circle
          className="radial-chart-progress"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${strokeLength},${circumference}`}
          strokeLinecap="round"
          fill="none"
          cx="90"
          cy="90"
          r={circleRadius}
        />
      </svg>
    </div>
  );
};

export default React.memo(RadialChart);
