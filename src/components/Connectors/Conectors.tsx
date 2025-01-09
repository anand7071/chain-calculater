import React, { useEffect, useState } from "react";

interface ConnectorProps {
  originId: string; 
  endId: string; 
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
    const [path, setPath] = useState("");

    useEffect(() => {
      const updatePath = () => {
        const fromElement = document.getElementById(originId);
        const toElement = document.getElementById(endId);
  
        if (fromElement && toElement) {
          // Get bounding boxes
          const fromRect = fromElement.getBoundingClientRect();
          const toRect = toElement.getBoundingClientRect();
        //   setFrom(fromRect);
        //   endtoFrom(toRect)

          const fromX = fromRect.right; 
          const fromY = fromRect.top + fromRect.height / 2;
  
          const toX = toRect.left;
          const toY = toRect.top + toRect.height / 2;
  
          const pathData = `
            M ${fromX} ${fromY} 
            C ${fromX + 50} ${fromY}, ${toX - 50} ${toY}, ${toX} ${toY}
          `;
          setPath(pathData);
        }
      };

      updatePath();
      window.addEventListener("resize", updatePath);
  
      return () => {
        window.removeEventListener("resize", updatePath);
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
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </svg>
  );
};

export default Connector;
