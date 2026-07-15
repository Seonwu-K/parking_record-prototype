export function CompassCard({
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
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 shrink-0 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
          <div className="absolute w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
            style={{ transform: `rotate(${bearingDeg}deg)` }}
          >
            <i className="fa-solid fa-location-arrow text-indigo-600 text-xl -translate-y-3"></i>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-400 font-semibold mb-0.5">내 위치에서 차량까지</p>
          <p className="text-lg font-black text-slate-900">
            {directionLabel}쪽 · 약 {distanceMeters}m
          </p>
          {caption && <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{caption}</p>}
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
    </div>
  );
}
