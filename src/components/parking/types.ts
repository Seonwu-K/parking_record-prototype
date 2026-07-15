export type ScreenId = "home-empty" | "home-saved" | "record" | "detail" | "settings" | "system-launcher";

export type ToastType = "info" | "success" | "warning";

export type DeviceActivity = "resting" | "driving" | "walking";

export type RecordSource = "auto" | "manual";

export type ParkingRecord = {
  floorType: string;
  floorNum: string;
  customFloorValue: string;
  floor: string;
  zone: string;
  photo: string | null;
  memo: string;
  timestamp: string;
  savedAtTimestamp: number;
  accuracyMeters: number;
  source: RecordSource;
};

export type ParkingFormState = {
  floorType: string;
  floorNum: string;
  customFloorValue: string;
  zone: string;
  photo: string | null;
  memo: string;
};

export type ToastState = {
  message: string;
  type: ToastType;
} | null;

export type AutoSaveNoticeState = {
  visible: boolean;
  accuracyMeters: number;
};
