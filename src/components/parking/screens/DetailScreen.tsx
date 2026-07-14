import type { ParkingRecord } from "../types";

export function DetailScreen({
  active,
  record,
  onBack,
  onEdit,
  onDelete,
  onRecordNew,
}: {
  active: boolean;
  record: ParkingRecord | null;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onRecordNew: () => void;
}) {
  return (
    <section
      className={`absolute inset-0 bg-white flex flex-col justify-between p-6 z-10 transition-all duration-300 transform ${
        active ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center py-2 border-b border-slate-100 shrink-0">
        <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-700">
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <span className="text-base font-bold text-slate-800">상세 주차 정보</span>
        <div className="w-8"></div>
      </div>

      {record && (
        <>
          <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-4">
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[10px] text-indigo-200 bg-indigo-900/50 px-2 py-0.5 rounded-md font-bold">
                  마지막 주차
                </span>

                <h4 className="text-2xl font-black mt-1">
                  <span>{record.floor}</span>
                  <span className="text-indigo-300 ml-1">{record.zone}</span>
                </h4>
              </div>

              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-car text-lg"></i>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400">저장된 주차 구역 사진</span>

              <div className="bg-slate-100 rounded-2xl overflow-hidden h-52 flex items-center justify-center border border-slate-200">
                {record.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={record.photo} className="w-full h-full object-cover" alt="저장된 사진" />
                ) : (
                  <div className="text-slate-400 flex flex-col items-center gap-1">
                    <i className="fa-regular fa-image text-3xl"></i>
                    <span className="text-xs">사진이 기록되지 않았습니다</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-400">저장한 메모</span>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-700 font-bold leading-relaxed">{record.memo}</p>
              </div>
            </div>

            {record.isTimeTrackEnabled && (
              <div className="flex justify-between items-center text-xs p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="text-amber-800 font-bold flex items-center gap-1">
                  <i className="fa-solid fa-clock"></i>
                  주차 시간 측정
                </span>

                <span className="font-extrabold text-amber-900 bg-amber-200/50 px-2 py-0.5 rounded">활성화됨</span>
              </div>
            )}

            <div className="flex justify-between items-center text-xs text-slate-400 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span>기록 일시</span>
              <span className="font-bold text-slate-600">{record.timestamp}</span>
            </div>
          </div>

          <div className="space-y-2 pb-2 shrink-0">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={onEdit} className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold text-xs">
                <i className="fa-solid fa-pen-to-square mr-1"></i>
                정보 수정
              </button>

              <button onClick={onDelete} className="bg-rose-50 hover:bg-rose-100 text-rose-600 py-3 rounded-xl font-bold text-xs">
                <i className="fa-regular fa-trash-can mr-1"></i>
                기록 삭제
              </button>
            </div>

            <button
              onClick={onRecordNew}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-3.5 rounded-xl font-bold text-xs"
            >
              새 주차 기록 덮어쓰기
            </button>
          </div>
        </>
      )}
    </section>
  );
}
