"use client";

import { useId, useMemo } from "react";

const RADIUS_PCT = 34;

function clampPct(value: number) {
  return Math.min(92, Math.max(8, value));
}

export function MiniMap({
  distanceMeters,
  bearingDeg,
  directionLabel,
  caption,
  onRefresh,
}: {
  distanceMeters: number;
  bearingDeg: number;
  directionLabel: string;
  caption?: string;
  onRefresh?: () => void;
}) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");

  const { carLeft, carTop, lineLengthPct, lineAngleDeg } = useMemo(() => {
    const angleRad = (bearingDeg * Math.PI) / 180;
    const left = clampPct(50 + RADIUS_PCT * Math.sin(angleRad));
    const top = clampPct(50 - RADIUS_PCT * Math.cos(angleRad));

    const dx = left - 50;
    const dy = top - 50;

    return {
      carLeft: left,
      carTop: top,
      lineLengthPct: Math.sqrt(dx * dx + dy * dy),
      lineAngleDeg: (Math.atan2(dy, dx) * 180) / Math.PI,
    };
  }, [bearingDeg]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes travel-${rawId} {
              0% { left: 50%; top: 50%; }
              100% { left: ${carLeft}%; top: ${carTop}%; }
            }
          `,
        }}
      />

      <div
        className="relative aspect-square w-full max-w-[220px] mx-auto rounded-2xl overflow-hidden border border-slate-100"
        style={{
          backgroundColor: "#f8fafc",
          backgroundImage: "radial-gradient(#c7d2fe 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      >
        {/* 연결선 */}
        <div
          className="absolute border-t-2 border-dashed border-indigo-200"
          style={{
            left: "50%",
            top: "50%",
            width: `${lineLengthPct}%`,
            transform: `translateY(-1px) rotate(${lineAngleDeg}deg)`,
            transformOrigin: "left center",
          }}
        />

        {/* 다가가는 애니메이션 점 */}
        <div
          className="absolute w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_0_3px_rgba(99,102,241,0.25)] -translate-x-1/2 -translate-y-1/2"
          style={{
            animation: `travel-${rawId} 2.2s ease-in-out infinite alternate`,
          }}
        />

        {/* 내 위치 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60"></span>
            <span className="relative inline-flex w-4 h-4 rounded-full bg-sky-500 border-2 border-white shadow"></span>
          </span>
        </div>

        {/* 차량 위치 */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${carLeft}%`, top: `${carTop}%` }}
        >
          <div className="w-7 h-7 rounded-full bg-indigo-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px]">
            <i className="fa-solid fa-car"></i>
          </div>
        </div>

        <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-md text-[9px] font-bold text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>내 위치
        </div>
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 bg-white/90 backdrop-blur px-1.5 py-0.5 rounded-md text-[9px] font-bold text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>차량
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400 font-semibold">내 위치에서 차량까지</p>
          <p className="text-lg font-black text-slate-900">
            {directionLabel}쪽 · 약 {distanceMeters}m
          </p>
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            aria-label="다시 계산"
            className="shrink-0 w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500"
          >
            <i className="fa-solid fa-rotate text-xs"></i>
          </button>
        )}
      </div>

      {caption && <p className="text-[11px] text-slate-400 leading-relaxed">{caption}</p>}
    </div>
  );
}
