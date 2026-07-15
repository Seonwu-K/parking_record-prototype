export function AutoSaveNotice({
  visible,
  accuracyMeters,
  onDismiss,
  onAddDetails,
}: {
  visible: boolean;
  accuracyMeters: number;
  onDismiss: () => void;
  onAddDetails: () => void;
}) {
  return (
    <div
      className={`absolute top-12 inset-x-4 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl z-50 flex items-start gap-3 border border-indigo-500/20 transition-all duration-500 transform ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
        <i className="fa-solid fa-location-dot text-white text-lg"></i>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-[11px] font-black text-indigo-400">위치 자동 저장됨</span>
          <span className="text-[9px] text-slate-400">방금</span>
        </div>

        <h4 className="text-xs font-bold text-white">📍 현재 위치가 저장되었습니다</h4>
        <p className="text-[10px] text-slate-300 mt-0.5">
          저장 당시 오차 약 {accuracyMeters}m. 야외·지상 주차장에서 가장 정확해요. 지하·실내에서는 위치가
          부정확하거나 건물 입구로 저장될 수 있어요.
        </p>

        <div className="flex gap-1.5 mt-2.5">
          <button onClick={onDismiss} className="text-[9px] bg-slate-800 text-slate-300 font-bold px-2.5 py-1 rounded">
            닫기
          </button>

          <button onClick={onAddDetails} className="text-[9px] bg-indigo-600 text-white font-bold px-3 py-1 rounded">
            층·구역·사진 추가하기 (선택)
          </button>
        </div>
      </div>
    </div>
  );
}
