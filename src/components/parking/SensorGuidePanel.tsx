import type { DeviceActivity } from "./types";

const ACTIVITY_LABEL: Record<DeviceActivity, string> = {
  resting: "정지 또는 대기",
  driving: "운전 중 (시속 40km/h 주행)",
  walking: "하차 및 도보 걷기",
};

export function SensorGuidePanel({
  deviceActivity,
  deviceBtConnected,
  registeredBtDevice,
  onDriveStart,
  onBtConnect,
  onDriveEnd,
}: {
  deviceActivity: DeviceActivity;
  deviceBtConnected: boolean;
  registeredBtDevice: string;
  onDriveStart: () => void;
  onBtConnect: () => void;
  onDriveEnd: () => void;
}) {
  const btLabel = deviceBtConnected
    ? `${registeredBtDevice} 연결됨`
    : registeredBtDevice
      ? "연결 안 됨"
      : "연결 안 됨";
  const btColorClass = deviceBtConnected ? "font-bold text-emerald-400" : "font-bold text-rose-500";

  return (
    <div className="w-full lg:w-[420px] bg-white border-b lg:border-b-0 lg:border-r border-slate-200 p-6 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-indigo-600 text-white text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              UT 가이드
            </span>
            <span className="text-xs text-slate-400">v2.3 (선택 기능 구분 완료)</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-1 flex items-center gap-2">
            <i className="fa-solid fa-square-parking text-indigo-600"></i> 마지막 주차
          </h1>
          <p className="text-xs text-slate-500">마지막으로 주차한 위치를 10초 만에 쉽고 직관적으로 남겨두는 도구</p>
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
              아래 버튼들을 순서대로 누르면 차량 탑승 및 하차(보행 전환) 시 스마트 알림이 오는 상황을 인위적으로
              시뮬레이션해볼 수 있습니다.
            </p>

            <div className="bg-white rounded-xl p-3 space-y-1.5 border border-slate-200 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">활동 상태:</span>
                <span className="font-bold text-slate-700">{ACTIVITY_LABEL[deviceActivity]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">블루투스 연결:</span>
                <span className={btColorClass}>{btLabel}</span>
              </div>
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
                onClick={onBtConnect}
                className="w-full bg-white hover:bg-slate-100 border border-slate-200 py-2 px-3 rounded-lg flex items-center justify-between text-left font-bold text-slate-700 transition-all"
              >
                <span>🔌 2단계: 차량 블루투스 연결</span>
                <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
              </button>

              <button
                onClick={onDriveEnd}
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-2.5 px-3 rounded-lg flex items-center justify-between text-left font-black text-white transition-all shadow-md shadow-indigo-600/10"
              >
                <span>🚶 3단계: 주행 종료 및 하차 (걷기)</span>
                <i className="fa-solid fa-bell text-[10px] text-indigo-200"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-xs text-indigo-950 space-y-3.5">
          <h3 className="font-bold text-indigo-900 flex items-center gap-2">
            <i className="fa-solid fa-circle-info text-indigo-600"></i> 검증 시나리오 따라가기
          </h3>
          <p className="leading-relaxed text-[11px] text-indigo-900/80">
            실제 환경처럼 자연스럽게 자동 주차 알림이 발생하는 과정을 순서대로 체험해 보세요.
          </p>
          <div className="space-y-3">
            <div className="flex gap-2 items-start">
              <span className="bg-indigo-200 text-indigo-800 font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 text-[10px]">
                1
              </span>
              <p className="leading-relaxed">
                우측 가상 폰에서 우측 상단의 <strong className="text-indigo-900">톱니바퀴(설정)</strong> 버튼을
                눌러 블루투스 기기 이름(예: <strong className="text-indigo-900">MyCar</strong>)을 임의로
                등록합니다.
              </p>
            </div>
            <div className="flex gap-2 items-start">
              <span className="bg-indigo-200 text-indigo-800 font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 text-[10px]">
                2
              </span>
              <p className="leading-relaxed">
                위의 컨트롤러에서 <strong className="text-indigo-900">&quot;운전 주행 시작&quot;</strong>과{" "}
                <strong className="text-indigo-900">&quot;차량 블루투스 연결&quot;</strong>을 순서대로 눌러 기기
                상태를 드라이브 상태로 만들어 줍니다.
              </p>
            </div>
            <div className="flex gap-2 items-start">
              <span className="bg-indigo-200 text-indigo-800 font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 text-[10px]">
                3
              </span>
              <p className="leading-relaxed">
                이제 목적지에 도착했다고 생각하고{" "}
                <strong className="text-indigo-900">&quot;주행 종료 및 하차(걷기)&quot;</strong> 버튼을 누릅니다.
                블루투스가 분리되고 활동이 바뀌는 즉시 안내 팝업 알림이 스마트폰 상단에 나타납니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
        <span>마지막 주차 프로토타입 v2.3</span>
        <span>2026.07</span>
      </div>
    </div>
  );
}
