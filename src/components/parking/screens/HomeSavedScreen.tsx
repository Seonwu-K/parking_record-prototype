import { CarFinder } from "../CarFinder";
import type { ParkingRecord, ScreenId } from "../types";

export function HomeSavedScreen({
  active,
  record,
  elapsedMinutes,
  onNavigate,
  onDelete,
  onAddTimeOffset,
  onRecordAgain,
}: {
  active: boolean;
  record: ParkingRecord;
  elapsedMinutes: number;
  onNavigate: (screen: ScreenId) => void;
  onDelete: () => void;
  onAddTimeOffset: (minutes: number) => void;
  onRecordAgain: () => void;
}) {
  const elapsedLabel = (() => {
    const hours = Math.floor(elapsedMinutes / 60);
    const minutes = elapsedMinutes % 60;
    return hours > 0 ? `${hours}시간 ${minutes}분째 주차 중` : `${minutes}분째 주차 중`;
  })();

  const hasDetails = Boolean(record.floor || record.zone || record.photo || record.memo);

  return (
    <section
      className={`absolute inset-0 bg-slate-50 flex flex-col justify-between p-6 z-20 transition-all duration-300 transform ${
        active ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center py-2 border-b border-slate-100 shrink-0">
        <span className="text-xl font-extrabold text-indigo-900 tracking-tight flex items-center gap-1.5">
          <i className="fa-solid fa-square-parking text-indigo-600"></i>
          마지막 주차
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("settings")}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
          >
            <i className="fa-solid fa-gear"></i>
          </button>
          <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-bold">
            {record.source === "auto" ? "자동 저장됨" : "기록 보관됨"}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">가장 최근 저장된 차량 위치</p>

        <div
          onClick={() => onNavigate("detail")}
          className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
        >
          <div className="p-5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white flex justify-between items-center">
            <div>
              <p className="text-xs text-white/70 font-semibold mb-0.5">내 차 주차 위치</p>

              <h3 className="text-xl font-black">{record.floor && record.zone ? `${record.floor} ${record.zone}` : "위치 저장됨"}</h3>
              <p className="text-[11px] text-indigo-100 mt-1">저장 당시 오차 약 {record.accuracyMeters}m</p>
            </div>

            <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center text-white text-xl">
              <i className="fa-solid fa-map-pin"></i>
            </div>
          </div>

          {record.photo && (
            <div className="relative h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={record.photo} alt="주차 사진" className="w-full h-full object-cover" />

              <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                <i className="fa-solid fa-magnifying-glass"></i>
                자세히 보기
              </div>
            </div>
          )}

          <div className="p-4 space-y-3">
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex justify-between items-center">
              <div className="flex gap-2 items-start">
                <i className="fa-solid fa-circle-notch text-amber-500 mt-1 animate-spin"></i>

                <div>
                  <p className="text-[10px] text-amber-700 font-bold">주차 시간 측정 중</p>
                  <p className="text-xs text-amber-900 font-extrabold mt-0.5">현재: {elapsedLabel}</p>
                </div>
              </div>

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  onAddTimeOffset(30);
                }}
                className="text-[10px] bg-amber-600 hover:bg-amber-700 text-white font-bold px-2 py-1 rounded-lg"
              >
                +30분
              </button>
            </div>

            {hasDetails ? (
              record.memo && (
                <div className="flex items-start gap-2 px-1">
                  <i className="fa-solid fa-note-sticky text-slate-400 text-xs mt-0.5"></i>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed break-words">{record.memo}</p>
                </div>
              )
            ) : (
              <div className="flex items-center justify-between px-1">
                <p className="text-xs text-slate-400">층·구역·사진은 아직 없어요</p>
                <span className="text-[10px] text-indigo-600 font-bold">선택 사항</span>
              </div>
            )}

            <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <i className="fa-regular fa-clock"></i>
                <span>기록 시각: {record.timestamp}</span>
              </span>
            </div>
          </div>
        </div>

        <CarFinder />

        <div className="bg-indigo-50 text-indigo-900 text-xs p-3.5 rounded-2xl border border-indigo-100/70 flex gap-2.5 items-start">
          <i className="fa-solid fa-info text-indigo-600 mt-0.5 shrink-0"></i>
          <p className="leading-relaxed">
            야외·지상 주차장에서 가장 정확해요. 지하·실내에서는 위치가 부정확하거나 건물 입구로 저장될 수
            있어요.
          </p>
        </div>
      </div>

      <div className="space-y-2 pb-2 shrink-0">
        <button
          onClick={onRecordAgain}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md"
        >
          <i className="fa-solid fa-rotate-left"></i>
          <span>지금 위치로 다시 저장하기</span>
        </button>

        <button
          onClick={onDelete}
          className="w-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 py-3 rounded-xl font-bold text-xs"
        >
          <i className="fa-regular fa-trash-can mr-1"></i>
          주차 기록 지우기
        </button>
      </div>
    </section>
  );
}
