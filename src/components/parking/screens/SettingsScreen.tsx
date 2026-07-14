import { useRef } from "react";

export function SettingsScreen({
  active,
  isAutoDetectEnabled,
  registeredBtDevice,
  onBack,
  onToggleAutoDetect,
  onRegisterBtDevice,
  onRemoveBtDevice,
}: {
  active: boolean;
  isAutoDetectEnabled: boolean;
  registeredBtDevice: string;
  onBack: () => void;
  onToggleAutoDetect: (checked: boolean) => void;
  onRegisterBtDevice: (name: string) => void;
  onRemoveBtDevice: () => void;
}) {
  const btInputRef = useRef<HTMLInputElement>(null);

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
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">알림 및 연동</h4>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <label className="text-xs font-black text-slate-700">자동 주행 종료 감지 알림</label>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                운전 종료 후 걷기 상태로 바뀔 때 주차 유도 알림을 띄웁니다.
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={isAutoDetectEnabled}
                onChange={(event) => onToggleAutoDetect(event.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        <div className="space-y-2.5">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">블루투스 연동 (선택 사항)</h4>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex-1 min-w-0">
              <label className="text-xs font-black text-slate-700">차량 블루투스 기기 등록</label>
              <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                차량 블루투스가 끊기고 걷기 상태가 될 때 감지 정확도를 높여 알림을 보냅니다.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                key={registeredBtDevice}
                ref={btInputRef}
                type="text"
                defaultValue={registeredBtDevice}
                placeholder="예: My_Car_BT"
                className="flex-1 bg-white border border-slate-200 focus:border-indigo-500 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800"
              />
              <button
                onClick={() => onRegisterBtDevice(btInputRef.current?.value ?? "")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 px-3 rounded-lg"
              >
                등록
              </button>
            </div>

            {registeredBtDevice && (
              <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 p-1.5 px-2 rounded-lg mt-1 w-max flex items-center gap-1">
                <i className="fa-solid fa-link"></i> <span>{registeredBtDevice} 등록됨</span>
                <button onClick={onRemoveBtDevice} className="text-slate-400 hover:text-red-500 ml-1.5">
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
              </div>
            )}
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
