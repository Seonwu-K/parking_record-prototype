import { formatFullDate } from "./constants";
import type { ParkingRecord } from "./types";

export function NotificationShade({
  isOpen,
  now,
  record,
  elapsedMinutes,
  onToggle,
  onClear,
  onOpenDetail,
  onAddTimeOffset,
}: {
  isOpen: boolean;
  now: Date;
  record: ParkingRecord | null;
  elapsedMinutes: number;
  onToggle: () => void;
  onClear: () => void;
  onOpenDetail: () => void;
  onAddTimeOffset: (minutes: number) => void;
}) {
  const timeLabel = now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <div
      className={`absolute inset-x-0 top-0 h-full bg-slate-950/95 text-white z-40 flex flex-col justify-between p-5 pb-8 transition-all duration-300 transform ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="space-y-5">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span className="font-medium">{formatFullDate(now)}</span>
          <span className="font-bold text-white">{timeLabel}</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "fa-solid fa-wifi", label: "Wi-Fi", active: true },
            { icon: "fa-solid fa-volume-high", label: "소리", active: false },
            { icon: "fa-solid fa-bluetooth", label: "블루투스", active: false },
            { icon: "fa-solid fa-flashlight", label: "손전등", active: false },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1">
              <button
                className={`w-11 h-11 rounded-full flex items-center justify-center text-sm ${
                  item.active ? "bg-indigo-600" : "bg-slate-800"
                }`}
              >
                <i className={item.icon}></i>
              </button>
              <span className="text-[10px] text-slate-300">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2.5 pt-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-xs font-bold text-slate-400">최근 알림</span>
            <button onClick={onClear} className="text-[10px] text-slate-500 hover:text-slate-300">
              지우기
            </button>
          </div>

          {record ? (
            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 flex gap-3.5 items-start">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
                <i className="fa-solid fa-square-parking text-lg"></i>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-xs font-bold text-indigo-400">마지막 주차 위치 고정 알림</span>
                  <span className="text-[9px] text-slate-500">{record.timestamp.split(" ")[1] || "방금"}</span>
                </div>

                <h5 className="text-sm font-black text-white">
                  {record.floor && record.zone ? `${record.floor} ${record.zone}` : "위치 저장됨"}
                </h5>

                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <p className="text-[11px] text-slate-400 truncate">
                    {record.memo || `오차 약 ${record.accuracyMeters}m`}
                  </p>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                    ⏱ {elapsedMinutes}분 경과
                  </span>
                </div>

                <div className="flex gap-2 mt-3 flex-wrap">
                  <button
                    onClick={onOpenDetail}
                    className="bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50 text-[10px] font-bold py-1.5 px-3 rounded-lg border border-indigo-500/30"
                  >
                    자세히 보기
                  </button>

                  <button
                    onClick={() => {
                      onClear();
                      onToggle();
                    }}
                    className="bg-slate-800 text-slate-400 hover:text-red-400 text-[10px] font-bold py-1.5 px-3 rounded-lg"
                  >
                    기록 지우기
                  </button>

                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      onAddTimeOffset(30);
                    }}
                    className="bg-amber-600/30 text-amber-300 hover:bg-amber-600/50 text-[10px] font-bold py-1.5 px-3 rounded-lg border border-amber-500/30"
                  >
                    +30분
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800/40 rounded-2xl p-4 text-center py-6">
              <i className="fa-solid fa-car-side text-slate-600 text-xl mb-1.5"></i>
              <p className="text-xs text-slate-400">현재 보관된 주차 위치가 없습니다.</p>
              <p className="text-[10px] text-slate-500 mt-1">상태바 고정 카드는 주차 저장 시에만 나타납니다.</p>
            </div>
          )}
        </div>
      </div>

      <button onClick={onToggle} className="w-full flex justify-center py-2 text-slate-500 hover:text-white">
        <i className="fa-solid fa-chevron-up text-sm"></i>
      </button>
    </div>
  );
}
