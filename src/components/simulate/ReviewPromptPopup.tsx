"use client";

export function ReviewPromptPopup({
  visible,
  onDismiss,
  onReview,
}: {
  visible: boolean;
  onDismiss: () => void;
  onReview: () => void;
}) {
  return (
    <div
      className={`fixed bottom-4 right-4 z-[60] w-[min(260px,calc(100vw-2rem))] bg-white border border-slate-200 rounded-2xl shadow-xl p-3.5 transition-all duration-300 transform ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 shrink-0 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-sm">
          <i className="fa-regular fa-comment-dots"></i>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-bold text-slate-900 mb-0.5">체험은 어떠셨나요?</h3>
          <p className="text-[11px] text-slate-500 leading-snug mb-2.5">
            짧은 평가를 남겨주시면 다음 버전에 큰 도움이 돼요.
          </p>

          <div className="flex gap-1.5">
            <button
              onClick={onDismiss}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-bold py-1.5 rounded-lg"
            >
              다음에
            </button>
            <button
              onClick={onReview}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold py-1.5 rounded-lg"
            >
              평가 남기기
            </button>
          </div>
        </div>

        <button
          onClick={onDismiss}
          aria-label="닫기"
          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-100 hover:text-slate-500"
        >
          <i className="fa-solid fa-xmark text-[10px]"></i>
        </button>
      </div>
    </div>
  );
}
