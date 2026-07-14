"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ParkingApp } from "@/components/parking/ParkingApp";
import { ReviewPromptPopup } from "@/components/simulate/ReviewPromptPopup";

const REVIEW_PROMPT_DELAY_MS = 1800;

export default function SimulatePage() {
  const router = useRouter();
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);

  return (
    <div className="flex-1 flex flex-col">
      <ParkingApp
        onSaveComplete={() => {
          window.setTimeout(() => setShowReviewPrompt(true), REVIEW_PROMPT_DELAY_MS);
        }}
      />

      <ReviewPromptPopup
        visible={showReviewPrompt}
        onDismiss={() => setShowReviewPrompt(false)}
        onReview={() => router.push("/feedback")}
      />
    </div>
  );
}
