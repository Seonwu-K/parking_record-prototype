import type { ToastState } from "./types";

const ICONS = {
  success: "fa-solid fa-circle-check text-emerald-400",
  warning: "fa-solid fa-triangle-exclamation text-amber-400",
  info: "fa-solid fa-circle-info text-indigo-400",
};

export function Toast({ toast }: { toast: ToastState }) {
  const visible = Boolean(toast);

  return (
    <div
      className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white text-[11px] py-2.5 px-4 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-300 z-50 min-w-[200px] justify-center ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <i className={ICONS[toast?.type ?? "info"]}></i>
      <span>{toast?.message ?? "주차 정보가 업데이트되었습니다."}</span>
    </div>
  );
}
