export function ArrivalPushAlert({
  visible,
  isBluetoothPath,
  registeredBtDevice,
  onDismiss,
  onConfirm,
}: {
  visible: boolean;
  isBluetoothPath: boolean;
  registeredBtDevice: string;
  onDismiss: () => void;
  onConfirm: () => void;
}) {
  const desc = isBluetoothPath
    ? `차량 블루투스(${registeredBtDevice}) 해제 및 보행 상태를 인식했습니다. 마지막 주차 위치를 기록하시겠습니까?`
    : "차량 이동 상태에서 걷기 상태로의 전환을 감지했습니다. 주차 위치를 기록하시겠습니까?";

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
          <span className="text-[11px] font-black text-indigo-400">자동 운행 감지 알림</span>
          <span className="text-[9px] text-slate-400">방금</span>
        </div>

        <h4 className="text-xs font-bold text-white">📍 차량 이동 종료 감지됨</h4>
        <p className="text-[10px] text-slate-300 mt-0.5">{desc}</p>

        <div className="flex gap-1.5 mt-2.5">
          <button
            onClick={onDismiss}
            className="text-[9px] bg-slate-800 text-slate-300 font-bold px-2.5 py-1 rounded"
          >
            나중에
          </button>

          <button onClick={onConfirm} className="text-[9px] bg-indigo-600 text-white font-bold px-3 py-1 rounded">
            지금 기록하기
          </button>
        </div>
      </div>
    </div>
  );
}
