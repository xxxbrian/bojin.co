"use client";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import React, { useEffect, useRef } from "react";

export default function Home() {
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
      className="flex flex-col dark h-screen w-screen font-sans bg-[#001522]"
      ref={vantaRef}
    >
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}
