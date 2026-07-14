export function BtAlertModal({
  visible,
  onClose,
  onOpenSettings,
}: {
  visible: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <div
      className={`absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-6 transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-3xl p-6 w-full max-w-[320px] text-center space-y-4 shadow-2xl transform transition-all duration-300 ${
          visible ? "scale-100" : "scale-90"
        }`}
      >
        <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto border-4 border-rose-100">
          <i className="fa-solid fa-triangle-exclamation text-2xl"></i>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-base font-black text-slate-900">블루투스 연결 불가</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            아직 앱 설정에서 차량 블루투스를 등록하지 않았습니다. 기기 연동을 위해 설정을 열고 블루투스 등록을
            마쳐주세요.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1.5 text-xs font-bold">
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl transition-colors"
          >
            닫기
          </button>
          <button
            onClick={onOpenSettings}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition-colors shadow-md shadow-indigo-600/10"
          >
            설정 열기
          </button>
        </div>
      </div>
    </div>
  );
}
