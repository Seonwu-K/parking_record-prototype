export type ScreenId =
  | "home-empty"
  | "home-saved"
  | "record"
  | "success"
  | "detail"
  | "settings"
  | "system-launcher";

export type ToastType = "info" | "success" | "warning";

export type DeviceActivity = "resting" | "driving" | "walking";

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
  isTimeTrackEnabled: boolean;
};

export type ParkingFormState = {
  floorType: string;
  floorNum: string;
  customFloorValue: string;
  zone: string;
  photo: string | null;
  memo: string;
  isTimeTrackEnabled: boolean;
};

export type ToastState = {
  message: string;
  type: ToastType;
} | null;
