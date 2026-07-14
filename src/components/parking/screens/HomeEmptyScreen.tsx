import type { ScreenId } from "../types";

export function HomeEmptyScreen({
  active,
  onNavigate,
}: {
  active: boolean;
  onNavigate: (screen: ScreenId) => void;
}) {
  return (
    <section
      className={`absolute inset-0 bg-white flex flex-col justify-between p-6 z-30 transition-all duration-300 transform ${
        active ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center py-2 border-b border-slate-100">
        <span className="text-xl font-extrabold text-indigo-900 tracking-tight flex items-center gap-1.5">
          <i className="fa-solid fa-square-parking text-indigo-600"></i>
          마지막 주차
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("settings")}
            className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500"
          >
            <i className="fa-solid fa-gear"></i>
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <i className="fa-solid fa-circle-user text-lg"></i>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border-4 border-slate-100 animate-pulse">
          <i className="fa-solid fa-car-tunnel text-4xl text-slate-300"></i>
        </div>

        <h2 className="text-lg font-bold text-slate-800 mb-2">마지막으로 주차한 위치가 없습니다</h2>

        <p className="text-sm text-slate-400 leading-relaxed">층, 구역, 사진과 메모를 간단하게 남겨보세요.</p>
      </div>

      <div className="pb-6">
        <button
          onClick={() => onNavigate("record")}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-transform text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20"
        >
          <i className="fa-solid fa-camera text-xl"></i>
          <span>주차 위치 기록하기</span>
        </button>
      </div>
    </section>
  );
}
