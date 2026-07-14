import { formatClock, formatShortDate } from "../constants";
import type { ParkingRecord, ScreenId } from "../types";

export function SystemLauncherScreen({
  active,
  now,
  record,
  elapsedMinutes,
  onNavigate,
  onShortcutToApp,
  onShortcutToDetail,
  onAddTimeOffset,
}: {
  active: boolean;
  now: Date;
  record: ParkingRecord | null;
  elapsedMinutes: number;
  onNavigate: (screen: ScreenId) => void;
  onShortcutToApp: (fallback: ScreenId) => void;
  onShortcutToDetail: () => void;
  onAddTimeOffset: (minutes: number) => void;
}) {
  return (
    <section
      className={`absolute inset-0 flex flex-col justify-between p-5 z-20 transition-all duration-300 transform bg-cover bg-center ${
        active ? "translate-x-0" : "translate-x-full"
      }`}
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop')",
      }}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center text-white px-2 pt-2">
          <div>
            <span className="text-4xl font-light tracking-tight">{formatClock(now)}</span>
            <p className="text-[10px] font-semibold text-white/80">{formatShortDate(now)}</p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold">
              <i className="fa-solid fa-cloud-sun text-yellow-400 text-base mr-1"></i>
              성남시 분당구
            </span>
            <p className="text-[10px] font-medium text-white/80">구름 조금, 26°C</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-4 border border-white/20 shadow-xl shadow-slate-950/30">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/50 mb-3">
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1">
              <i className="fa-solid fa-square-parking"></i>
              마지막 주차 위젯
            </span>
            <span className="text-[9px] text-slate-400 font-medium">
              업데이트: {record ? record.timestamp.split(" ")[1] || "-" : "미등록"}
            </span>
          </div>

          {record ? (
            <div className="flex gap-3 items-center">
              <div className="w-14 h-14 bg-slate-200 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                {record.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={record.photo} className="w-full h-full object-cover" alt="위젯 사진" />
                ) : (
                  <div className="text-slate-400 w-full h-full flex items-center justify-center">
                    <i className="fa-regular fa-image text-lg"></i>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black text-slate-800 leading-tight">
                  <span>{record.floor}</span>
                  <span className="text-indigo-600 ml-1">{record.zone}</span>
                </h4>

                <p className="text-[10px] text-slate-500 truncate mt-1">{record.memo}</p>

                {record.isTimeTrackEnabled && (
                  <div className="flex items-center gap-1.5 mt-1 text-[10px] font-black text-amber-600 bg-amber-100/60 px-2 py-0.5 rounded-lg w-max">
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    <span>경과: {elapsedMinutes}분</span>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        onAddTimeOffset(30);
                      }}
                      className="text-[8px] bg-amber-600 text-white font-bold px-1 rounded hover:bg-amber-700"
                    >
                      +30분
                    </button>
                  </div>
                )}

                <div className="flex gap-1.5 mt-2.5">
                  <button
                    onClick={onShortcutToDetail}
                    className="text-[9px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-2.5 py-1 rounded-md"
                  >
                    상세 보기
                  </button>

                  <button
                    onClick={() => onNavigate("record")}
                    className="text-[9px] bg-slate-200 text-slate-600 font-bold px-2.5 py-1 rounded-md"
                  >
                    새 기록
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-3">
              <p className="text-xs text-slate-500 font-bold mb-2">🚗 저장된 주차 위치 정보가 없습니다</p>

              <button
                onClick={() => onShortcutToApp("record")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold py-1.5 px-4 rounded-xl shadow-sm"
              >
                주차 기록 시작하기
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-3xl border border-white/10">
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => onShortcutToApp("home-empty")}>
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
            <i className="fa-solid fa-square-parking"></i>
          </div>
          <span className="text-[9px] text-white font-medium">마지막 주차</span>
        </div>

        {[
          { icon: "fa-solid fa-phone", label: "전화", color: "bg-emerald-600" },
          { icon: "fa-solid fa-message", label: "메시지", color: "bg-slate-700" },
          { icon: "fa-solid fa-camera", label: "카메라", color: "bg-indigo-900" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1 opacity-60">
            <div className={`w-12 h-12 ${item.color} text-white rounded-2xl flex items-center justify-center text-xl`}>
              <i className={item.icon}></i>
            </div>
            <span className="text-[9px] text-white font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
