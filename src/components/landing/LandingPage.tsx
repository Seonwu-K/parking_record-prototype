import Link from "next/link";
import { PhonePreview } from "./PhonePreview";

const PROBLEM_SOLUTION_PAIRS = [
  {
    problem: "지하 주차장에서 층수랑 구역을 헷갈려서 한참 헤맨 적, 있으신가요?",
    icon: "fa-solid fa-camera",
    solutionTitle: "10초 만에 기록",
    solutionDescription: "층, 구역, 사진, 메모를 간단히 입력해 마지막 주차 위치를 바로 남길 수 있어요.",
  },
  {
    problem: "유료 주차장에서 얼마나 오래 세워뒀는지 몰라 요금이 헷갈렸던 적은요?",
    icon: "fa-solid fa-clock",
    solutionTitle: "주차 시간 자동 측정",
    solutionDescription: "요금 계산에 참고할 수 있도록 경과 시간을 30분 단위로 알려드려요.",
  },
  {
    problem: "주차하고 나서 앱을 켜서 기록하는 것 자체를 깜빡한 적은요?",
    icon: "fa-solid fa-bell",
    solutionTitle: "운행 종료 자동 감지",
    solutionDescription: "운전을 마치고 걷기 시작하면 자동으로 주차 위치를 기록할지 물어봐요.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "차를 대고 기록해요",
    description: "층·구역·사진·메모를 10초 안에 남겨요. 운행이 끝나면 자동으로 물어봐 주기도 해요.",
  },
  {
    step: "2",
    title: "필요할 때 홈에서 바로 확인해요",
    description: "앱을 열자마자, 혹은 홈 화면 위젯과 알림에서 바로 마지막 주차 위치를 볼 수 있어요.",
  },
  {
    step: "3",
    title: "유료 주차장이면 경과 시간도 같이 봐요",
    description: "30분 단위로 경과 시간을 알려줘서 요금 계산할 때 참고할 수 있어요.",
  },
];

export function LandingPage() {
  return (
    <div className="flex-1 bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/70 via-white to-white -z-10"></div>

        <div className="max-w-5xl mx-auto px-6 pt-20 pb-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full mb-5">
              프로토타입 · 사용자 피드백 수집 중
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
              또 주차장에서
              <br />
              차를 못 찾고 계신가요?
            </h1>

            <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-9">
              아파트·대형마트·복합시설 주차장에서 마지막으로 주차한 위치를 기억 못 해 헤매는 시간을 줄여주는
              앱이에요. 지금 30초면 실제 화면처럼 체험해볼 수 있어요.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                href="/simulate"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all text-white font-bold text-base py-3.5 px-7 rounded-2xl shadow-lg shadow-indigo-600/20"
              >
                <i className="fa-solid fa-mobile-screen-button"></i>
                30초 만에 체험해보기
              </Link>
              <span className="text-xs text-slate-400">설치 없이 이 화면에서 바로 써볼 수 있어요</span>
            </div>
          </div>

          <PhonePreview />
        </div>
      </section>

      {/* 문제 -> 해결 */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">이런 경험, 있으신가요?</h2>
          <p className="text-slate-500">주차장에서 흔히 겪는 불편을 하나씩 해결해봤어요.</p>
        </div>

        <div className="space-y-5">
          {PROBLEM_SOLUTION_PAIRS.map((item, index) => (
            <div
              key={item.solutionTitle}
              className="grid sm:grid-cols-[auto_1fr_auto_1fr] gap-4 sm:gap-6 items-center bg-slate-50 border border-slate-200 rounded-3xl p-6"
            >
              <span className="hidden sm:flex w-8 h-8 rounded-full bg-slate-200 text-slate-500 font-black text-sm items-center justify-center shrink-0">
                {index + 1}
              </span>

              <p className="font-semibold text-slate-700 leading-relaxed">
                <i className="fa-regular fa-comment-dots text-slate-400 mr-2"></i>
                {item.problem}
              </p>

              <i className="hidden sm:block fa-solid fa-arrow-right text-slate-300"></i>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 shrink-0 bg-indigo-600 text-white rounded-xl flex items-center justify-center">
                  <i className={item.icon}></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-0.5">{item.solutionTitle}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.solutionDescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 사용 흐름 */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">이렇게 사용해요</h2>
            <p className="text-slate-500">복잡한 설정 없이, 딱 세 단계예요.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="bg-white border border-slate-200 rounded-3xl p-6">
                <span className="inline-flex w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 font-black items-center justify-center mb-4">
                  {item.step}
                </span>
                <h3 className="font-bold text-slate-900 mb-1.5">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 투명성 / 신뢰 */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-[auto_1fr] gap-5 items-start bg-indigo-50/60 border border-indigo-100 rounded-3xl p-8">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-lg shrink-0">
            <i className="fa-solid fa-flask"></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 mb-2">아직 완성된 서비스가 아니에요</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              매일 하나의 불편을 골라 가설을 세우고, 작은 프로토타입을 만들어 사용자에게 보여주고, 배운 것을
              정리해 다음 걸 만드는 방식으로 개발하고 있어요. 지금 이 화면도 그 결과물 중 하나예요.
            </p>
            <p className="text-slate-600 leading-relaxed">
              그래서 완벽하지 않을 수 있어요. 대신 체험 후 남겨주시는 의견은 다음 버전에 실제로 반영돼요.
            </p>
          </div>
        </div>
      </section>

      {/* 최종 CTA */}
      <section className="bg-slate-900">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">지금 체험하고 의견을 남겨주세요</h2>
          <p className="text-slate-400 max-w-lg mx-auto leading-relaxed mb-8">
            실제 스마트폰 화면처럼 동작하는 시뮬레이션이에요. 체험이 끝나면 짧은 평가를 남길 수 있어요.
          </p>
          <Link
            href="/simulate"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 active:scale-[0.98] transition-all text-slate-900 font-bold text-sm py-3.5 px-7 rounded-xl"
          >
            체험하러 가기
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </section>
    </div>
  );
}
