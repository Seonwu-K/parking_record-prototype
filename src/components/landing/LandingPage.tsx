import Link from "next/link";
import { PhonePreview } from "./PhonePreview";
import { MiniMap } from "@/components/shared/MiniMap";

const PROBLEM_SOLUTION_PAIRS = [
  {
    problem: "대형마트, 휴게소, 공영주차장처럼 넓은 야외 주차장에서 차를 어디 세웠는지 잊은 적 있으신가요?",
    icon: "fa-solid fa-location-dot",
    solutionTitle: "운전 종료 자동 감지·저장",
    solutionDescription: "운전을 마치고 걷기 시작하면 위치와 시간이 자동으로 저장돼요. 층·구역·사진은 원할 때만 추가하면 돼요.",
  },
  {
    problem: "저장해둔 위치까지 다시 걸어갈 때 방향을 몰라 헤맨 적은요?",
    icon: "fa-solid fa-location-crosshairs",
    solutionTitle: "차량 위치 찾기",
    solutionDescription: "내 위치와 차량 위치를 함께 보여주고, 거리와 방향을 안내해요.",
  },
  {
    problem: "유료 주차장에서 얼마나 오래 세워뒀는지 몰라 요금이 헷갈렸던 적은요?",
    icon: "fa-solid fa-clock",
    solutionTitle: "주차 시간 자동 측정",
    solutionDescription: "요금 계산에 참고할 수 있도록 경과 시간을 30분 단위로 알려드려요.",
  },
];

const TARGET_PLACES = [
  "대형마트·아울렛 지상 주차장",
  "공원·관광지·축제장 임시주차장",
  "휴게소·캠핑장",
  "공영 노외주차장",
  "아파트 지상 주차장",
  "골프장·경기장·놀이공원 주차장",
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "운전이 끝나면 자동으로 저장돼요",
    description: "걷기 상태로 바뀌는 순간 현재 위치와 시간이 자동으로 기록돼요. 직접 갱신하고 싶을 때도 언제든 가능해요.",
  },
  {
    step: "2",
    title: "필요하면 층·구역·사진을 더해요",
    description: "저장은 자동이지만, 층수·구역·사진·메모는 원할 때만 선택적으로 추가하면 돼요.",
  },
  {
    step: "3",
    title: "다시 찾아갈 때 방향을 안내받아요",
    description: "내 위치와 차량 위치를 함께 보여주고, 거리와 방향을 알려줘서 헤매지 않게 도와줘요.",
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
            <span className="inline-block bg-indigo-50 text-indigo-700 text-xs px-3 py-1.5 rounded-full mb-5 font-bold">
              프로토타입 · 사용자 피드백 수집 중
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
              야외 주차장에서
              <br />
              차를 못 찾고 계신가요?
            </h1>

            <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-9">
              운전 종료 후 현재 지도 위치를 자동으로 기록하고, 지도에서 내 위치와 차량 위치를 함께 확인하는
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
          <p className="text-slate-500">넓은 야외 주차장에서 흔히 겪는 불편을 하나씩 해결해봤어요.</p>
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

      {/* 차량 위치 찾기 비주얼 */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
              차량 위치, 헤매지 않고 찾아가요
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              저장된 차량 위치와 지금 내 위치를 함께 보여주고, 거리와 방향을 안내해요. 넓은 야외 주차장에서도
              걸어가야 할 방향이 한눈에 보여요.
            </p>
            <MiniMap
              distanceMeters={120}
              bearingDeg={45}
              directionLabel="북동"
              caption="예시 화면이에요. 실제 거리와 방향은 저장된 위치 기준으로 계산돼요."
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-tree text-emerald-600"></i>
              야외·지상 주차장에서 가장 잘 동작해요
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-slate-600 mb-5">
              {TARGET_PLACES.map((place) => (
                <li key={place} className="flex items-start gap-1.5">
                  <i className="fa-solid fa-check text-emerald-500 text-xs mt-1"></i>
                  <span>{place}</span>
                </li>
              ))}
            </ul>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 flex gap-2.5">
              <i className="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5"></i>
              <p className="text-xs text-amber-800 leading-relaxed">
                지하 또는 실내 주차장에서는 위치가 부정확하거나 건물 입구 위치로 저장될 수 있어요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 사용 흐름 */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">이렇게 사용해요</h2>
          <p className="text-slate-500">복잡한 설정 없이, 딱 세 단계예요.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
              <span className="inline-flex w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 font-black items-center justify-center mb-4">
                {item.step}
              </span>
              <h3 className="font-bold text-slate-900 mb-1.5">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 투명성 / 신뢰 */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-[auto_1fr] gap-5 items-start bg-indigo-50/60 border border-indigo-100 rounded-3xl p-8">
          <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-lg shrink-0">
            <i className="fa-solid fa-flask"></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 mb-2">아직 완성된 서비스가 아니에요</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              지금은 정식 출시 전 프로토타입 단계로, 사용자 의견을 받아 계속 업데이트하고 있어요.
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
