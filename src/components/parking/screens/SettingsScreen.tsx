export function SettingsScreen({
  active,
  isAutoSaveEnabled,
  onBack,
  onToggleAutoSave,
}: {
  active: boolean;
  isAutoSaveEnabled: boolean;
  onBack: () => void;
  onToggleAutoSave: (checked: boolean) => void;
}) {
  return (
    <section
      className={`absolute inset-0 bg-white flex flex-col justify-between p-6 z-30 transition-all duration-300 transform ${
        active ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center py-2 border-b border-slate-100 shrink-0">
        <button onClick={onBack} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-700">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <span className="text-base font-bold text-slate-800">설정</span>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-5">
        <div className="space-y-2.5">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">위치 자동 저장</h4>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <label className="text-xs font-black text-slate-700">운전 종료 시 위치 자동 저장</label>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                운전이 끝나고 걷기 상태로 바뀌면 현재 위치와 시간을 자동으로 기록해요. 꺼두면 직접 기록해야
                해요.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={isAutoSaveEnabled}
                onChange={(event) => onToggleAutoSave(event.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl flex gap-2.5">
            <i className="fa-solid fa-circle-info text-indigo-500 mt-0.5"></i>
            <p className="text-[11px] text-indigo-900 leading-relaxed">
              야외·지상 주차장에서 가장 정확하게 동작해요. 지하·실내 주차장에서는 위치가 부정확하거나 건물
              입구로 저장될 수 있어요. 차량 블루투스 연동으로 감지 정확도를 높이는 기능은 추후 지원할
              예정이에요.
            </p>
          </div>
        </div>
      </div>

      <div className="pb-2 shrink-0">
        <button onClick={onBack} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm">
          설정 저장 완료
        </button>
      </div>
    </section>
  );
}
