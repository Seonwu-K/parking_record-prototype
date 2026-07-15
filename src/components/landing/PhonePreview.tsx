export function PhonePreview() {
  return (
    <div className="relative mx-auto w-[240px] sm:w-[260px]">
      <div className="absolute -inset-6 bg-gradient-to-br from-indigo-200/60 via-indigo-100/40 to-transparent rounded-[3rem] blur-2xl -z-10"></div>

      <div className="bg-slate-900 rounded-[2.25rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden ring-4 ring-slate-800/10">
        <div className="bg-white h-6 flex items-center justify-between px-4 text-[9px] font-semibold text-slate-700">
          <span>13:09</span>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-square-parking text-indigo-600 text-[9px]"></i>
            <i className="fa-solid fa-wifi text-[9px]"></i>
          </div>
        </div>

        <div className="bg-slate-50 p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-indigo-900 flex items-center gap-1">
              <i className="fa-solid fa-square-parking text-indigo-600"></i>
              마지막 주차
            </span>
            <span className="text-[8px] bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-full font-bold">
              자동 저장됨
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
              <p className="text-[8px] text-white/70 font-semibold mb-0.5">내 차 주차 위치</p>
              <p className="text-sm font-black">위치 저장됨</p>
              <p className="text-[9px] text-indigo-100 mt-0.5">오차 약 14m</p>
            </div>
            <div className="p-2.5 space-y-1.5">
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-2 py-1.5 flex items-center justify-between">
                <span className="text-[8px] font-bold text-amber-800">현재 12분째 주차 중</span>
                <span className="text-[7px] bg-amber-600 text-white font-bold px-1 py-0.5 rounded">+30분</span>
              </div>
              <div className="flex items-center gap-1 text-[8px] text-indigo-600 font-bold">
                <i className="fa-solid fa-location-crosshairs"></i>
                차량 위치 찾기
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 text-white text-[9px] font-bold text-center py-2 rounded-xl">
            지금 위치로 다시 저장하기
          </div>
        </div>
      </div>
    </div>
  );
}
