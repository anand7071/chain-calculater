import React, { useEffect, useState } from "react";

interface ConnectorProps {
  originId: string; // ID of the origin element
  endId: string; // ID of the end element
  color?: string;
  strokeWidth?: number;
  className : string
}

const Connector: React.FC<ConnectorProps> = ({
  originId,
  endId,
  color = "blue",
  strokeWidth = 2,
  className
}) => {
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [end, setEnd] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePositions = () => {
      const originElement = document.getElementById(originId);
      const endElement = document.getElementById(endId);
        console.log(originElement,endElement,originId,)
      if (originElement && endElement) {
        const originRect = originElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();

        setStart({
          x: originRect.left + originRect.width / 2,
          y: originRect.top + originRect.height / 2,
        });

        setEnd({
          x: endRect.left + endRect.width / 2,
          y: endRect.top + endRect.height / 2,
        });
      }
    };

    // Initial position calculation
    updatePositions();

    // Recalculate positions on window resize
    window.addEventListener("resize", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
    };
  }, [originId, endId]);

  return (
    <svg
      style={{
        position: "absolute",
        pointerEvents: "none",
        overflow: "visible",
        top :0,
        left : 0
      }}
      className={className}
    >
      <path
        d={`M ${start.x} ${start.y} C ${
          start.x + (end.x - start.x)
        } ${start.y}, ${start.x + (end.x - start.x) } ${end.y}, ${end.x} ${
          end.y
        }`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};

export default Connector;
