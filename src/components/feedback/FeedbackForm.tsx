const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf0MxSoIIvIcSeqNJqFWdQLxZOAQW0xt6_3-96g9ZjSVJOO5g/viewform?embedded=true";

export function FeedbackForm() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="border-t-8 border-indigo-600 bg-white border border-slate-200 rounded-2xl p-7 mb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">마지막 주차 · 체험 후기</h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          방금 체험하신 프로토타입에 대한 솔직한 의견을 들려주세요. 남겨주신 답변은 다음 버전을 만드는 데 큰
          도움이 됩니다.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <iframe
          src={GOOGLE_FORM_EMBED_URL}
          title="마지막 주차 체험 후기 설문"
          width="100%"
          height="2400"
          className="block"
        >
          로드 중…
        </iframe>
      </div>
    </div>
  );
}
