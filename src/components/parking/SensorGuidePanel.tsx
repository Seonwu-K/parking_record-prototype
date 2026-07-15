import type { DeviceActivity } from "./types";

const ACTIVITY_LABEL: Record<DeviceActivity, string> = {
  resting: "정지 또는 대기",
  driving: "운전 중 (시속 40km/h 주행)",
  walking: "하차 및 도보 걷기",
};

export function SensorGuidePanel({
  deviceActivity,
  onDriveStart,
  onDriveEnd,
}: {
  deviceActivity: DeviceActivity;
  onDriveStart: () => void;
  onDriveEnd: () => void;
}) {
  return (
    <div className="w-full lg:w-[420px] bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-6 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-indigo-600 text-white text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              UT 가이드
            </span>
            <span className="text-xs text-slate-400">v3.0 (야외 주차 자동 기록)</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-1 flex items-center gap-2">
            <i className="fa-solid fa-square-parking text-indigo-600"></i> 마지막 주차
          </h1>
          <p className="text-xs text-slate-500">운전이 끝나면 위치를 자동으로 기록해두는 도구</p>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="w-full bg-slate-50 p-4 flex justify-between items-center text-left">
            <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <i className="fa-solid fa-gauge-high text-slate-500"></i>
              [선택] 가상 센서 조작판
            </span>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-4">
            <p className="text-[11px] text-slate-500 leading-normal">
              아래 버튼들을 순서대로 누르면 운전 종료(보행 전환)를 감지해 위치를 자동으로 저장하는 상황을
              인위적으로 시뮬레이션해볼 수 있습니다.
            </p>

            <div className="bg-white rounded-xl p-3 border border-slate-200 text-[11px] flex justify-between">
              <span className="text-slate-400 font-medium">활동 상태:</span>
              <span className="font-bold text-slate-700">{ACTIVITY_LABEL[deviceActivity]}</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <button
                onClick={onDriveStart}
                className="w-full bg-white hover:bg-slate-100 border border-slate-200 py-2 px-3 rounded-lg flex items-center justify-between text-left font-bold text-slate-700 transition-all"
              >
                <span>🚗 1단계: 운전 주행 시작하기</span>
                <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
              </button>

              <button
                onClick={onDriveEnd}
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-2.5 px-3 rounded-lg flex items-center justify-between text-left font-black text-white transition-all shadow-md shadow-indigo-600/10"
              >
                <span>🚶 2단계: 주행 종료 및 하차 (걷기)</span>
                <i className="fa-solid fa-bell text-[10px] text-indigo-200"></i>
              </button>
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed">
              <i className="fa-solid fa-bluetooth mr-1"></i>
              차량 블루투스 연동으로 더 정확하게 감지하는 기능도 추후 지원할 예정이에요. 지금 시뮬레이션에서는
              운전 → 보행 전환만으로 동작을 확인할 수 있어요.
            </p>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-xs text-indigo-950 space-y-3.5">
          <h3 className="font-bold text-indigo-900 flex items-center gap-2">
            <i className="fa-solid fa-circle-info text-indigo-600"></i> 검증 시나리오 따라가기
          </h3>
          <p className="leading-relaxed text-[11px] text-indigo-900/80">
            실제 환경처럼 자연스럽게 위치가 자동 저장되는 과정을 순서대로 체험해 보세요.
          </p>
          <div className="space-y-3">
            <div className="flex gap-2 items-start">
              <span className="bg-indigo-200 text-indigo-800 font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 text-[10px]">
                1
              </span>
              <p className="leading-relaxed">
                위의 컨트롤러에서 <strong className="text-indigo-900">&quot;운전 주행 시작&quot;</strong>을 눌러
                기기 상태를 드라이브 상태로 만들어 줍니다.
              </p>
            </div>
            <div className="flex gap-2 items-start">
              <span className="bg-indigo-200 text-indigo-800 font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 text-[10px]">
                2
              </span>
              <p className="leading-relaxed">
                이제 목적지에 도착했다고 생각하고{" "}
                <strong className="text-indigo-900">&quot;주행 종료 및 하차(걷기)&quot;</strong> 버튼을 누릅니다.
                활동이 바뀌는 즉시 현재 위치가 자동으로 저장되고, 저장 안내가 스마트폰 상단에 나타납니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
        <span>마지막 주차 프로토타입 v3.0</span>
        <span>2026.07</span>
      </div>
    </div>
  );
}
