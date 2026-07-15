import { CarFinder } from "../CarFinder";
import type { ParkingRecord } from "../types";

export function DetailScreen({
  active,
  record,
  onBack,
  onEdit,
  onDelete,
  onRecordAgain,
}: {
  active: boolean;
  record: ParkingRecord | null;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onRecordAgain: () => void;
}) {
  const hasDetails = Boolean(record?.floor || record?.zone || record?.photo || record?.memo);

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
                  {record.source === "auto" ? "자동 저장됨" : "마지막 주차"}
                </span>

                <h4 className="text-xl font-black mt-1">
                  {record.floor && record.zone ? `${record.floor} ${record.zone}` : "위치 저장됨"}
                </h4>
                <p className="text-[11px] text-indigo-200 mt-1">저장 당시 오차 약 {record.accuracyMeters}m</p>
              </div>

              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-car text-lg"></i>
              </div>
            </div>

            <CarFinder />

            {hasDetails ? (
              <>
                {record.photo && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400">저장된 주차 구역 사진</span>
                    <div className="bg-slate-100 rounded-2xl overflow-hidden h-52 flex items-center justify-center border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={record.photo} className="w-full h-full object-cover" alt="저장된 사진" />
                    </div>
                  </div>
                )}

                {record.memo && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-400">저장한 메모</span>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <p className="text-xs text-slate-700 font-bold leading-relaxed">{record.memo}</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-5 text-center space-y-2">
                <i className="fa-regular fa-image text-slate-300 text-2xl"></i>
                <p className="text-xs text-slate-500">아직 층·구역·사진이 없어요. 필요할 때만 추가하면 돼요.</p>
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
                {hasDetails ? "정보 수정" : "정보 추가"}
              </button>

              <button onClick={onDelete} className="bg-rose-50 hover:bg-rose-100 text-rose-600 py-3 rounded-xl font-bold text-xs">
                <i className="fa-regular fa-trash-can mr-1"></i>
                기록 삭제
              </button>
            </div>

            <button
              onClick={onRecordAgain}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-3.5 rounded-xl font-bold text-xs"
            >
              지금 위치로 다시 저장하기
            </button>
          </div>
        </>
      )}
    </section>
  );
}
