import Link from "next/link";

const FEATURES = [
  {
    icon: "fa-solid fa-camera",
    title: "10초 만에 기록",
    description: "층, 구역, 사진, 메모를 간단히 입력해 마지막 주차 위치를 바로 남길 수 있어요.",
  },
  {
    icon: "fa-solid fa-clock",
    title: "주차 시간 자동 측정",
    description: "유료 주차장에서 요금 계산에 참고할 수 있도록 경과 시간을 30분 단위로 알려드려요.",
  },
  {
    icon: "fa-solid fa-bell",
    title: "운행 종료 자동 감지",
    description: "운전을 마치고 걷기 시작하면 자동으로 주차 위치를 기록할지 물어봐요.",
  },
];

export function LandingPage() {
  return (
    <div className="flex-1 bg-white">
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full mb-5">
          프로토타입 · 사용자 피드백 수집 중
        </span>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
          마지막 주차 위치,
          <br />
          이제 기억하지 않아도 돼요
        </h1>

        <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-9">
          아파트·대형마트·복합시설 주차장에서 차량을 어디에 뒀는지 헤매는 시간을 줄여주는 주차 위치 기록
          앱입니다. 지금 시뮬레이션으로 직접 체험해보세요.
        </p>

        <Link
          href="/simulate"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all text-white font-bold text-base py-3.5 px-7 rounded-2xl shadow-lg shadow-indigo-600/20"
        >
          <i className="fa-solid fa-mobile-screen-button"></i>
          지금 체험해보기
        </Link>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
              <div className="w-11 h-11 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-lg mb-4">
                <i className={feature.icon}></i>
              </div>
              <h3 className="font-bold text-slate-900 mb-1.5">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-3">아직 프로토타입 단계예요</h2>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed mb-8">
            실제 스마트폰 화면처럼 동작하는 시뮬레이션을 체험해보시고, 느낀 점을 알려주세요. 여러분의 의견이
            다음 버전을 만드는 데 큰 도움이 됩니다.
          </p>
          <Link
            href="/simulate"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition-all text-white font-bold text-sm py-3 px-6 rounded-xl"
          >
            체험하러 가기
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </section>
    </div>
  );
}
