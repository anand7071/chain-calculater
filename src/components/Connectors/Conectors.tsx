import React, { useEffect, useState } from "react";

interface ConnectorProps {
  originId: string;
  targetId: string;
  curvedValue? : number
}

const Connector: React.FC<ConnectorProps> = ({ originId, targetId,curvedValue= 50}) => {
  const [path, setPath] = useState("");

  useEffect(() => {
    const updatePath = () => {
      const origin = document.getElementById(originId);
      const target = document.getElementById(targetId);

      if (origin && target) {
        const originRect = origin.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const startX = originRect.left + window.scrollX + originRect.width / 2;
        const startY = originRect.top + window.scrollY + originRect.height / 2;
        const endX = targetRect.left + window.scrollX + targetRect.width / 2;
        const endY = targetRect.top + window.scrollY + targetRect.height / 2;
        const controlX1 = startX;
        const controlY1 = startY + curvedValue; 
        const controlX2 = endX;
        const controlY2 = endY - curvedValue;
        const pathData = `M ${startX},${startY} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`;
        setPath(pathData);
      }
    };

    updatePath();

    window.addEventListener("resize", updatePath);
    window.addEventListener("scroll", updatePath);

    return () => {
      window.removeEventListener("resize", updatePath);
      window.removeEventListener("scroll", updatePath);
    };
  }, [originId, targetId]);

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{ position: "absolute" }}
    >
      <path d={path} stroke="#ACCEF7" strokeWidth="5" fill="none" />
    </svg>
  );
};


export default Connector;
