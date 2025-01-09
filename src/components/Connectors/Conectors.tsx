import React, { useEffect, useState } from "react";

interface ConectorsProps {
  fromId: string; // ID of the starting element
  toId: string; 
}

const Conectors: React.FC<ConectorsProps> = ({ fromId, toId }) => {
  const [path, setPath] = useState("");

  useEffect(() => {
    const updatePath = () => {
      // Get the DOM elements
      const fromElement = document.getElementById(fromId);
      const toElement = document.getElementById(toId);

      if (fromElement && toElement) {
        // Get bounding boxes
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();

        // Calculate the start and end points
        const fromX = fromRect.right; // Right edge of the "from" element
        const fromY = fromRect.top + fromRect.height / 2; // Vertically centered

        const toX = toRect.left; // Left edge of the "to" element
        const toY = toRect.top + toRect.height / 2; // Vertically centered

        // Create the path for the curve
        const pathData = `
          M ${fromX} ${fromY} 
          C ${fromX + 50} ${fromY}, ${toX - 50} ${toY}, ${toX} ${toY}
        `;
        setPath(pathData);
      }
    };

    // Update the path initially and on window resize
    updatePath();
    window.addEventListener("resize", updatePath);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", updatePath);
    };
  }, [fromId, toId]);

  return (
    <svg
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex: -1,
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    >
      <path d={path} stroke="blue" fill="none" strokeWidth={2} />
    </svg>
  );
};

export default Conectors;
