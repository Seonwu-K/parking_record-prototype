"use client";

import { useState } from "react";
import { bearingToDirectionLabel, generateCarLocationHint } from "./constants";
import { CompassCard } from "../shared/CompassCard";

export function CarFinder() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(() => generateCarLocationHint());

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2"
      >
        <i className="fa-solid fa-location-crosshairs"></i>
        차량 위치 찾기
      </button>
    );
  }

  return (
    <CompassCard
      distanceMeters={hint.distanceMeters}
      bearingDeg={hint.bearingDeg}
      directionLabel={bearingToDirectionLabel(hint.bearingDeg)}
      caption="* 시뮬레이션이라 임의의 방향과 거리로 표시돼요."
      onRefresh={() => setHint(generateCarLocationHint())}
    />
  );
}
