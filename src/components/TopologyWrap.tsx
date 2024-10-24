"use client";
import React, { useEffect, useRef } from "react";

// get children from props
const TopologyWrap = ({ children }: { children: React.ReactNode }) => {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect: { destroy: () => void } | null = null;
    const p5 = require("p5"); // Import p5 only on the client-side

    import("vanta/dist/vanta.topology.min")
      .then((VANTA) => {
        if (vantaRef.current) {
          vantaEffect = VANTA.default({
            el: vantaRef.current,
            p5: p5,
            mouseControls: true,
            touchControls: true,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x4e9196,
            backgroundColor: 0x1522,
          });
        }
      })
      .catch((e) => console.error(e));

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div
      className="flex flex-col dark h-full w-full bg-[#001522]"
      ref={vantaRef}
    >
      {children}
    </div>
  );
};

export default TopologyWrap;
