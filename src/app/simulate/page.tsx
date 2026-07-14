"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ParkingApp } from "@/components/parking/ParkingApp";
import { ReviewPromptPopup } from "@/components/simulate/ReviewPromptPopup";

export default function SimulatePage() {
  const router = useRouter();
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);

  return (
    <div className="flex-1 flex flex-col">
      <ParkingApp onSaveComplete={() => setShowReviewPrompt(true)} />

      <ReviewPromptPopup
        visible={showReviewPrompt}
        onDismiss={() => setShowReviewPrompt(false)}
        onReview={() => router.push("/feedback")}
      />
    </div>
  );
}
