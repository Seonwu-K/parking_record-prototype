import type { ParkingRecord, ScreenId } from "../types";

export function HomeSavedScreen({
  active,
  record,
  elapsedMinutes,
  onNavigate,
  onDelete,
  onAddTimeOffset,
}: {
  active: boolean;
  record: ParkingRecord;
  elapsedMinutes: number;
  onNavigate: (screen: ScreenId) => void;
  onDelete: () => void;
  onAddTimeOffset: (minutes: number) => void;
}) {
  const elapsedLabel = (() => {
    const hours = Math.floor(elapsedMinutes / 60);
    const minutes = elapsedMinutes % 60;
    return hours > 0 ? `${hours}시간 ${minutes}분째 주차 중` : `${minutes}분째 주차 중`;
  })();

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
          <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-bold">기록 보관됨</span>
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

              <h3 className="text-2xl font-black flex items-baseline gap-2">
                <span>{record.floor}</span>
                <span className="text-indigo-200 text-xl font-bold">{record.zone}</span>
              </h3>
            </div>

            <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center text-white text-xl">
              <i className="fa-solid fa-map-pin"></i>
            </div>
          </div>

          <div className="relative h-44 bg-slate-100 flex items-center justify-center overflow-hidden">
            {record.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={record.photo} alt="주차 사진" className="w-full h-full object-cover" />
            ) : (
              <div className="text-slate-400 flex flex-col items-center gap-1">
                <i className="fa-regular fa-image text-3xl"></i>
                <span className="text-xs">등록된 사진 없음</span>
              </div>
            )}

            <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
              <i className="fa-solid fa-magnifying-glass"></i>
              자세히 보기
            </div>
          </div>

          <div className="p-4 space-y-3">
            {record.isTimeTrackEnabled && (
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
            )}

            <div className="flex items-start gap-2 px-1">
              <i className="fa-solid fa-note-sticky text-slate-400 text-xs mt-0.5"></i>
              <p className="text-xs text-slate-600 font-medium leading-relaxed break-words">{record.memo}</p>
            </div>

            {record.isTimeTrackEnabled && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2">
                <i className="fa-solid fa-clock text-amber-600"></i>

                <div>
                  <p className="text-xs font-bold text-amber-900">주차 시간 알림 사용 중</p>
                  <p className="text-[10px] text-amber-700 mt-0.5">30분 단위 경과 시간 안내가 활성화되어 있습니다.</p>
                </div>
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

        <div className="bg-indigo-50 text-indigo-900 text-xs p-3.5 rounded-2xl border border-indigo-100/70 flex gap-2.5 items-start">
          <i className="fa-solid fa-info text-indigo-600 mt-0.5 shrink-0"></i>
          <p className="leading-relaxed">카드를 터치하면 원본 사진 확인, 정보 수정, 기록 삭제를 수행할 수 있습니다.</p>
        </div>
      </div>

      <div className="space-y-2 pb-2 shrink-0">
        <button
          onClick={() => onNavigate("record")}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md"
        >
          <i className="fa-solid fa-rotate-left"></i>
          <span>새 주차 위치 기록하기</span>
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
