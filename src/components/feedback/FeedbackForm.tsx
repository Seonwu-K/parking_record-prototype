"use client";

import { useState } from "react";

const SATISFACTION_OPTIONS = ["1", "2", "3", "4", "5"];

export function FeedbackForm() {
  const [satisfaction, setSatisfaction] = useState("");
  const [inconvenience, setInconvenience] = useState("");
  const [wouldUseAgain, setWouldUseAgain] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-5">
          <i className="fa-solid fa-circle-check text-2xl"></i>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">소중한 의견 감사합니다</h1>
        <p className="text-slate-500 leading-relaxed">남겨주신 답변은 다음 버전을 만드는 데 큰 도움이 됩니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="border-t-8 border-indigo-600 bg-white border border-slate-200 rounded-2xl p-7 mb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">마지막 주차 · 체험 후기</h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          방금 체험하신 프로토타입에 대한 솔직한 의견을 들려주세요. 설문 문항은 추후 더 구체화될 예정입니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <label className="block font-bold text-slate-800 mb-4">
            전반적으로 이 서비스가 마음에 드셨나요? <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center justify-between max-w-sm">
            <span className="text-xs text-slate-400">별로예요</span>
            <div className="flex gap-3">
              {SATISFACTION_OPTIONS.map((value) => (
                <label key={value} className="flex flex-col items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="satisfaction"
                    value={value}
                    checked={satisfaction === value}
                    onChange={(event) => setSatisfaction(event.target.value)}
                    className="w-4 h-4 accent-indigo-600"
                    required
                  />
                  <span className="text-xs text-slate-500">{value}</span>
                </label>
              ))}
            </div>
            <span className="text-xs text-slate-400">좋아요</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <label htmlFor="inconvenience" className="block font-bold text-slate-800 mb-3">
            체험하면서 가장 불편했던 점은 무엇인가요?
          </label>
          <textarea
            id="inconvenience"
            value={inconvenience}
            onChange={(event) => setInconvenience(event.target.value)}
            rows={4}
            placeholder="자유롭게 작성해 주세요"
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-3 px-4 text-sm text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <label className="block font-bold text-slate-800 mb-4">
            이런 앱이 있다면 다시 사용하고 싶으신가요? <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-3">
            {["네, 사용할 것 같아요", "잘 모르겠어요", "아니요"].map((option) => (
              <label
                key={option}
                className={`flex-1 text-center text-sm font-semibold py-2.5 rounded-xl border cursor-pointer transition-colors ${
                  wouldUseAgain === option
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <input
                  type="radio"
                  name="wouldUseAgain"
                  value={option}
                  checked={wouldUseAgain === option}
                  onChange={(event) => setWouldUseAgain(event.target.value)}
                  className="sr-only"
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <label htmlFor="email" className="block font-bold text-slate-800 mb-3">
            이메일 <span className="text-slate-400 font-normal">(선택, 후속 인터뷰 요청 시에만 사용)</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white rounded-xl py-3 px-4 text-sm text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all text-white font-bold text-sm py-3 px-8 rounded-xl"
        >
          제출하기
        </button>
      </form>
    </div>
  );
}
