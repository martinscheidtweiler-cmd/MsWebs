"use client";
import { useEffect, useRef } from "react";

export default function HipCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let rafId: number;
    let isHovering = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onEnterLink = () => { isHovering = true; };
    const onLeaveLink = () => { isHovering = false; };

    // Attach hover listeners to interactive elements
    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, select, textarea, label").forEach(el => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    addHoverListeners();

    // rAF loop — dot follows instantly, ring lerps
    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + "px";
        dotRef.current.style.top  = mouseY + "px";

        if (isHovering) {
          dotRef.current.style.width  = "0px";
          dotRef.current.style.height = "0px";
          dotRef.current.style.opacity = "0";
        } else {
          dotRef.current.style.width  = "8px";
          dotRef.current.style.height = "8px";
          dotRef.current.style.opacity = "1";
        }
      }

      // Lerp ring toward mouse (0.12 = lag amount)
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = ringX + "px";
        ringRef.current.style.top  = ringY + "px";

        if (isHovering) {
          ringRef.current.style.width  = "52px";
          ringRef.current.style.height = "52px";
          ringRef.current.style.borderColor = "var(--orange)";
          ringRef.current.style.opacity = "0.8";
        } else {
          ringRef.current.style.width  = "36px";
          ringRef.current.style.height = "36px";
          ringRef.current.style.borderColor = "rgba(237,110,33,0.45)";
          ringRef.current.style.opacity = "1";
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    // Re-attach when DOM changes (navigation)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot — instant */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--orange)",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s, opacity 0.2s",
          willChange: "left, top",
        }}
      />
      {/* Ring — lagged */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(237,110,33,0.45)",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          transition: "width 0.25s, height 0.25s, border-color 0.25s, opacity 0.25s",
          willChange: "left, top",
        }}
      />
    </>
  );
}
