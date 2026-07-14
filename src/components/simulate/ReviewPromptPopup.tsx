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
  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[60] w-[min(320px,calc(100vw-2.5rem))] bg-white border border-slate-200 rounded-3xl shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-4">
      <button
        onClick={onDismiss}
        aria-label="닫기"
        className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600"
      >
        <i className="fa-solid fa-xmark text-xs"></i>
      </button>

      <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-lg mb-3">
        <i className="fa-regular fa-comment-dots"></i>
      </div>

      <h3 className="font-bold text-slate-900 mb-1.5">체험은 어떠셨나요?</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">
        방금 체험한 내용을 바탕으로 짧은 평가를 남겨주시면 다음 버전을 만드는 데 큰 도움이 돼요.
      </p>

      <div className="flex gap-2">
        <button
          onClick={onDismiss}
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold py-2.5 rounded-xl"
        >
          다음에
        </button>
        <button
          onClick={onReview}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 rounded-xl"
        >
          평가 남기기
        </button>
      </div>
    </div>
  );
}
