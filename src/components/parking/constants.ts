export const STORAGE_KEY = "last_parking_data_v3.0";
export const LEGACY_STORAGE_KEY = "last_parking_data_v2.0";

export const SETTING_AUTO_SAVE_KEY = "setting_auto_save";

export const DEMO_PARKING_PHOTOS = [
  "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop",
];

export function generateAccuracyMeters(): number {
  return Math.round(8 + Math.random() * 55);
}

const COMPASS_DIRECTIONS = ["북", "북동", "동", "남동", "남", "남서", "서", "북서"];

export function generateCarLocationHint(): { distanceMeters: number; bearingDeg: number } {
  return {
    distanceMeters: Math.round(20 + Math.random() * 280),
    bearingDeg: Math.round(Math.random() * 359),
  };
}

export function bearingToDirectionLabel(bearingDeg: number): string {
  const index = Math.round(bearingDeg / 45) % 8;
  return COMPASS_DIRECTIONS[index];
}

export function buildFloorLabel(
  floorType: string,
  floorNum: string,
  customFloorValue: string
): string {
  if (floorType) {
    if (floorNum === "custom") {
      return customFloorValue ? `${floorType} ${customFloorValue}` : `${floorType} 지정층`;
    }
    if (floorNum) {
      return `${floorType} ${floorNum}층`;
    }
    return `${floorType} 주차장`;
  }

  if (floorNum === "custom") {
    return customFloorValue || "지정층";
  }
  if (floorNum) {
    return `${floorNum}층`;
  }
  return "지정되지 않음";
}

export function formatTimestamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

export function formatClock(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function formatFullDate(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${
    WEEKDAYS[date.getDay()]
  }요일`;
}

export function formatShortDate(date: Date): string {
  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${WEEKDAYS[date.getDay()]}요일`;
}
