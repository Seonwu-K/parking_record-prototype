import type { ParkingRecord } from "../types";

export function SuccessScreen({
  active,
  record,
  onGoHome,
}: {
  active: boolean;
  record: ParkingRecord | null;
  onGoHome: () => void;
}) {
  return (
    <section
      className={`absolute inset-0 bg-white flex flex-col justify-between p-6 z-10 transition-all duration-300 transform ${
        active ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex-1 flex flex-col justify-center items-center py-6 text-center">
        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 border-4 border-indigo-100">
          <i className="fa-solid fa-circle-check text-4xl text-indigo-600"></i>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-6">주차 위치를 저장했습니다.</h2>

        {record && (
          <div className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <span className="text-xs text-slate-400">주차 위치</span>

              <span className="text-base font-black text-indigo-900">
                <span>{record.floor}</span>
                <span className="text-slate-600 ml-1">{record.zone}</span>
              </span>
            </div>

            <div className="h-24 bg-slate-200 rounded-xl overflow-hidden flex items-center justify-center relative">
              {record.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={record.photo} className="w-full h-full object-cover" alt="주차 사진" />
              ) : (
                <div className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <i className="fa-regular fa-image"></i>
                  <span>사진 없이 저장됨</span>
                </div>
              )}
            </div>

            <div className="text-left space-y-1">
              <div className="flex gap-2 text-xs">
                <span className="text-slate-400 font-medium shrink-0">메모</span>
                <span className="text-slate-700 font-semibold truncate">{record.memo}</span>
              </div>

              <div className="flex gap-2 text-xs">
                <span className="text-slate-400 font-medium shrink-0">일시</span>
                <span className="text-slate-500 font-semibold truncate">{record.timestamp}</span>
              </div>

              {record.isTimeTrackEnabled && (
                <div className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 p-1 px-2 rounded-lg mt-2 w-max flex items-center gap-1">
                  <i className="fa-solid fa-clock"></i>
                  주차 시간 자동 측정 작동 중
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="pb-2 shrink-0">
        <button
          onClick={onGoHome}
          className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white py-4 rounded-2xl font-bold text-sm shadow-md"
        >
          홈에서 확인하기
        </button>
      </div>
    </section>
  );
}
