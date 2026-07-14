import type { ParkingFormState } from "../types";

const FLOOR_NUM_OPTIONS = [
  { value: "1", label: "1층" },
  { value: "2", label: "2층" },
  { value: "3", label: "3층" },
  { value: "4", label: "4층" },
  { value: "5", label: "5층" },
  { value: "custom", label: "직접 입력" },
];

export function RecordScreen({
  active,
  form,
  onBack,
  onUpdateForm,
  onSetFloorType,
  onSetFloorNum,
  onTriggerCamera,
  onTriggerDemoPhoto,
  onClearPhoto,
  onAutoFill,
  onSave,
}: {
  active: boolean;
  form: ParkingFormState;
  onBack: () => void;
  onUpdateForm: (partial: Partial<ParkingFormState>) => void;
  onSetFloorType: (type: string) => void;
  onSetFloorNum: (num: string) => void;
  onTriggerCamera: () => void;
  onTriggerDemoPhoto: () => void;
  onClearPhoto: () => void;
  onAutoFill: () => void;
  onSave: () => void;
}) {
  const activeFloorTypeClass =
    "w-full h-full bg-indigo-600 text-white border border-indigo-600 text-xs py-2 font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm";
  const inactiveFloorTypeClass =
    "w-full h-full bg-slate-50 text-slate-700 border border-slate-200 hover:bg-indigo-50 text-xs py-2 font-bold rounded-xl transition-all flex items-center justify-center gap-1.5";

  const activeFloorNumClass =
    "w-full bg-indigo-600 text-white border border-indigo-600 text-xs py-2.5 font-bold rounded-lg transition-all text-center shadow-sm";
  const inactiveFloorNumClass =
    "w-full bg-slate-50 text-slate-700 border border-slate-200 hover:bg-indigo-50 text-xs py-2.5 font-bold rounded-lg transition-all text-center";

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

        <span className="text-base font-bold text-slate-800">주차 기록하기</span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-4">
        <div className="space-y-2 relative z-10">
          <label className="text-xs font-black text-slate-600 flex items-center gap-1.5">
            <span className="bg-indigo-100 text-indigo-700 w-4 h-4 rounded-full flex items-center justify-center text-[9px]">
              1
            </span>
            주차 층 구분 및 선택
          </label>

          <div className="grid grid-cols-2 gap-2 h-10">
            <button
              type="button"
              onClick={() => onSetFloorType("지하")}
              className={form.floorType === "지하" ? activeFloorTypeClass : inactiveFloorTypeClass}
            >
              <i className="fa-solid fa-arrow-turn-down text-[10px]"></i>
              지하주차장
            </button>

            <button
              type="button"
              onClick={() => onSetFloorType("지상")}
              className={form.floorType === "지상" ? activeFloorTypeClass : inactiveFloorTypeClass}
            >
              <i className="fa-solid fa-arrow-turn-up text-[10px]"></i>
              지상주차장
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5 pt-2 relative z-20">
            {FLOOR_NUM_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onSetFloorNum(option.value)}
                className={form.floorNum === option.value ? activeFloorNumClass : inactiveFloorNumClass}
              >
                {option.label}
              </button>
            ))}
          </div>

          {form.floorNum === "custom" && (
            <div className="pt-2.5">
              <input
                type="text"
                value={form.customFloorValue}
                onChange={(event) => onUpdateForm({ customFloorValue: event.target.value })}
                placeholder="예) 7, M2, 옥상"
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-2.5 px-4 text-xs font-semibold text-slate-800 placeholder:text-slate-400"
              />
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-600 flex items-center gap-1.5">
            <span className="bg-indigo-100 text-indigo-700 w-4 h-4 rounded-full flex items-center justify-center text-[9px]">
              2
            </span>
            주차 구역 입력
          </label>

          <input
            type="text"
            value={form.zone}
            onChange={(event) => onUpdateForm({ zone: event.target.value })}
            placeholder="예) A-13, 203동 기둥"
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-3 px-4 text-xs font-medium text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-600 flex items-center gap-1.5">
            <span className="bg-indigo-100 text-indigo-700 w-4 h-4 rounded-full flex items-center justify-center text-[9px]">
              3
            </span>
            주차 위치 사진 추가
          </label>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onTriggerCamera}
              className="flex flex-col items-center justify-center bg-indigo-50/50 hover:bg-indigo-50 border border-dashed border-indigo-200 rounded-xl py-3 text-indigo-600"
            >
              <i className="fa-solid fa-camera text-lg mb-1"></i>
              <span className="text-[10px] font-bold">가상 카메라 촬영</span>
            </button>

            <button
              type="button"
              onClick={onTriggerDemoPhoto}
              className="flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-200 rounded-xl py-3 text-slate-600"
            >
              <i className="fa-solid fa-image text-lg mb-1"></i>
              <span className="text-[10px] font-bold">샘플 사진 적용</span>
            </button>
          </div>

          {form.photo && (
            <div className="relative h-28 bg-slate-100 rounded-xl overflow-hidden mt-1 border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.photo} className="w-full h-full object-cover" alt="주차구역 프리뷰" />

              <button
                onClick={onClearPhoto}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
              >
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black text-slate-600 flex items-center gap-1.5">
            <span className="bg-indigo-100 text-indigo-700 w-4 h-4 rounded-full flex items-center justify-center text-[9px]">
              4
            </span>
            간단한 메모
          </label>

          <input
            type="text"
            value={form.memo}
            onChange={(event) => onUpdateForm({ memo: event.target.value })}
            placeholder="예) 입구 바로 옆 엘리베이터 근처"
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-3 px-4 text-xs font-medium text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-1.5 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <i className="fa-solid fa-clock text-indigo-600"></i>
              유료 주차 시간 알림 받기
            </label>

            <p className="text-[10px] text-slate-400 mt-1 leading-normal">
              체크 시 경과 시간을 기록하고 30분 단위 안내 알림을 표시합니다.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={form.isTimeTrackEnabled}
              onChange={(event) => onUpdateForm({ isTimeTrackEnabled: event.target.checked })}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="bg-indigo-50 border border-indigo-100/70 rounded-xl p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>

            <span className="text-[10px] text-indigo-800 font-semibold">1초 빠른 정보 입력</span>
          </div>

          <button
            type="button"
            onClick={onAutoFill}
            className="bg-white hover:bg-indigo-100 text-indigo-700 text-[10px] font-bold py-1 px-2.5 rounded-lg border border-indigo-200 shadow-sm"
          >
            자동 입력
          </button>
        </div>
      </div>

      <div className="pt-3 pb-2 shrink-0">
        <button
          onClick={onSave}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-4 rounded-2xl font-bold text-sm shadow-md"
        >
          현재 위치 저장하기
        </button>
      </div>
    </section>
  );
}
