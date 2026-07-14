"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEMO_PARKING_PHOTOS,
  LEGACY_STORAGE_KEY,
  SETTING_AUTO_DETECT_KEY,
  SETTING_BT_DEVICE_KEY,
  STORAGE_KEY,
  buildFloorLabel,
  formatTimestamp,
} from "./constants";
import type {
  DeviceActivity,
  ParkingFormState,
  ParkingRecord,
  ScreenId,
  ToastState,
  ToastType,
} from "./types";

const EMPTY_FORM: ParkingFormState = {
  floorType: "",
  floorNum: "",
  customFloorValue: "",
  zone: "",
  photo: null,
  memo: "",
  isTimeTrackEnabled: false,
};

function loadStoredRecord(): ParkingRecord | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as ParkingRecord;
    if (!parsed.savedAtTimestamp) {
      parsed.savedAtTimestamp = Date.now();
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    return parsed;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function useParkingApp() {
  const [hydrated, setHydrated] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [currentScreen, setCurrentScreen] = useState<ScreenId>("home-empty");
  const [, setScreenHistory] = useState<ScreenId[]>(["home-empty"]);
  const [parkingRecord, setParkingRecord] = useState<ParkingRecord | null>(null);
  const [form, setForm] = useState<ParkingFormState>(EMPTY_FORM);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [timeOffsetMinutes, setTimeOffsetMinutes] = useState(0);
  const [toast, setToast] = useState<ToastState>(null);

  const [isAutoDetectEnabled, setIsAutoDetectEnabled] = useState(true);
  const [registeredBtDevice, setRegisteredBtDevice] = useState("");
  const [deviceActivity, setDeviceActivity] = useState<DeviceActivity>("resting");
  const [deviceBtConnected, setDeviceBtConnected] = useState(false);

  const [arrivalAlert, setArrivalAlert] = useState<{ visible: boolean; isBluetoothPath: boolean }>({
    visible: false,
    isBluetoothPath: false,
  });
  const [btAlertVisible, setBtAlertVisible] = useState(false);

  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastNotifiedThresholdRef = useRef(0);

  // 초기 로드: localStorage(외부 저장소)에 있던 주차 기록/설정을 마운트 시 한 번만 동기화한다.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const record = loadStoredRecord();
    if (record) {
      setParkingRecord(record);
      setCurrentScreen("home-saved");
      setScreenHistory(["home-saved"]);
    }

    const isAutoStr = window.localStorage.getItem(SETTING_AUTO_DETECT_KEY);
    if (isAutoStr !== null) setIsAutoDetectEnabled(isAutoStr === "true");

    const btDeviceStr = window.localStorage.getItem(SETTING_BT_DEVICE_KEY);
    if (btDeviceStr !== null) setRegisteredBtDevice(btDeviceStr);

    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // 시계 및 경과 시간 갱신
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    setToast({ message, type });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const closeNotificationShade = useCallback(() => {
    setIsNotificationOpen(false);
  }, []);

  const toggleNotificationShade = useCallback(() => {
    setIsNotificationOpen((prev) => !prev);
  }, []);

  const navigateTo = useCallback(
    (screenId: ScreenId, options?: { replaceHistory?: boolean }) => {
      setIsNotificationOpen(false);

      const nextScreen: ScreenId = screenId === "home-saved" && !parkingRecord ? "home-empty" : screenId;

      setCurrentScreen(nextScreen);
      setScreenHistory((prevHistory) => {
        if (options?.replaceHistory) return [nextScreen];
        if (prevHistory[prevHistory.length - 1] === nextScreen) return prevHistory;
        return [...prevHistory, nextScreen];
      });
    },
    [parkingRecord]
  );

  const backToPrevScreen = useCallback(() => {
    setIsNotificationOpen(false);

    if (currentScreen === "system-launcher") {
      showToast("현재 휴대폰 홈 화면입니다.");
      return;
    }

    setScreenHistory((prevHistory) => {
      if (prevHistory.length <= 1) {
        setCurrentScreen("system-launcher");
        return ["system-launcher"];
      }
      const nextHistory = prevHistory.slice(0, -1);
      setCurrentScreen(nextHistory[nextHistory.length - 1]);
      return nextHistory;
    });
  }, [currentScreen, showToast]);

  const navigateToLauncher = useCallback(() => navigateTo("system-launcher"), [navigateTo]);

  const shortcutToDetail = useCallback(() => {
    navigateTo(parkingRecord ? "detail" : "record");
  }, [navigateTo, parkingRecord]);

  const shortcutToApp = useCallback(
    (fallbackScreen: ScreenId) => {
      navigateTo(parkingRecord ? "home-saved" : fallbackScreen);
    },
    [navigateTo, parkingRecord]
  );

  const updateForm = useCallback((partial: Partial<ParkingFormState>) => {
    setForm((prev) => ({ ...prev, ...partial }));
  }, []);

  const setFloorType = useCallback((type: string) => {
    setForm((prev) => ({ ...prev, floorType: type }));
  }, []);

  const setFloorNum = useCallback((num: string) => {
    setForm((prev) => ({ ...prev, floorNum: num }));
  }, []);

  const setPreviewPhoto = useCallback((src: string) => {
    setForm((prev) => ({ ...prev, photo: src }));
  }, []);

  const triggerSimulatedCamera = useCallback(() => {
    setPreviewPhoto(DEMO_PARKING_PHOTOS[0]);
    showToast("차량 위치 사진이 촬영되었습니다.", "success");
  }, [setPreviewPhoto, showToast]);

  const triggerDemoPhoto = useCallback(() => {
    setPreviewPhoto(DEMO_PARKING_PHOTOS[1]);
    showToast("샘플 사진이 적용되었습니다.");
  }, [setPreviewPhoto, showToast]);

  const clearPhoto = useCallback(() => {
    setForm((prev) => ({ ...prev, photo: null }));
    showToast("사진이 지워졌습니다.");
  }, [showToast]);

  const resetForm = useCallback(() => {
    setForm(EMPTY_FORM);
  }, []);

  const autoFillMockData = useCallback(() => {
    setForm({
      floorType: "지하",
      floorNum: "2",
      customFloorValue: "",
      zone: "A-13",
      photo: DEMO_PARKING_PHOTOS[0],
      memo: "2번 엘리베이터 근처",
      isTimeTrackEnabled: true,
    });
    showToast("지하 2층 A-13 및 알림 정보가 입력되었습니다.");
  }, [showToast]);

  const saveParkingData = useCallback(() => {
    const hasAnyData = form.floorType || form.floorNum || form.zone.trim() || form.photo || form.memo.trim();

    if (!hasAnyData) {
      showToast("최소한 한 종류의 데이터는 기록해야 합니다.", "warning");
      return;
    }

    if (form.floorNum === "custom" && !form.customFloorValue.trim()) {
      showToast("직접 입력할 층 정보를 작성해 주세요.", "warning");
      return;
    }

    const savedAt = new Date();
    const record: ParkingRecord = {
      floorType: form.floorType,
      floorNum: form.floorNum,
      customFloorValue: form.customFloorValue,
      floor: buildFloorLabel(form.floorType, form.floorNum, form.customFloorValue),
      zone: form.zone.trim() || "구역 미입력",
      photo: form.photo,
      memo: form.memo.trim() || "메모 없음",
      timestamp: formatTimestamp(savedAt),
      savedAtTimestamp: savedAt.getTime(),
      isTimeTrackEnabled: form.isTimeTrackEnabled,
    };

    setParkingRecord(record);
    setTimeOffsetMinutes(0);
    lastNotifiedThresholdRef.current = 0;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));

    navigateTo("success");
    showToast("성공적으로 저장되었습니다.", "success");
  }, [form, navigateTo, showToast]);

  const deleteParkingRecord = useCallback(() => {
    setParkingRecord(null);
    setTimeOffsetMinutes(0);
    lastNotifiedThresholdRef.current = 0;
    setIsNotificationOpen(false);

    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);

    resetForm();
    navigateTo("home-empty", { replaceHistory: true });
    showToast("기존 주차 기록이 삭제되었습니다.");
  }, [navigateTo, resetForm, showToast]);

  const editParking = useCallback(() => {
    if (!parkingRecord) return;

    setForm({
      floorType: parkingRecord.floorType,
      floorNum: parkingRecord.floorNum,
      customFloorValue: parkingRecord.customFloorValue,
      zone: parkingRecord.zone === "구역 미입력" ? "" : parkingRecord.zone,
      photo: parkingRecord.photo,
      memo: parkingRecord.memo === "메모 없음" ? "" : parkingRecord.memo,
      isTimeTrackEnabled: parkingRecord.isTimeTrackEnabled,
    });

    navigateTo("record");
    showToast("기존 정보를 편집할 수 있습니다.");
  }, [navigateTo, parkingRecord, showToast]);

  const clearNotif = useCallback(() => {
    if (!parkingRecord) {
      showToast("지울 주차 기록이 없습니다.");
      return;
    }
    deleteParkingRecord();
  }, [deleteParkingRecord, parkingRecord, showToast]);

  const addTimeOffset = useCallback(
    (minutes: number) => {
      if (!parkingRecord) return;
      setTimeOffsetMinutes((prev) => prev + minutes);
      showToast(`시간을 ${minutes}분 앞으로 이동했습니다.`);
    },
    [parkingRecord, showToast]
  );

  const elapsedMinutes = (() => {
    if (!parkingRecord) return 0;
    const realElapsed = Math.floor((now.getTime() - parkingRecord.savedAtTimestamp) / 60000);
    return Math.max(0, realElapsed + timeOffsetMinutes);
  })();

  // 30분 단위 경과 알림
  useEffect(() => {
    if (!parkingRecord || !parkingRecord.isTimeTrackEnabled) return;
    if (elapsedMinutes > 0 && elapsedMinutes % 30 === 0 && lastNotifiedThresholdRef.current !== elapsedMinutes) {
      lastNotifiedThresholdRef.current = elapsedMinutes;
      showToast(`[알림] 주차 시간 ${elapsedMinutes}분 경과`, "warning");
    }
  }, [elapsedMinutes, parkingRecord, showToast]);

  const toggleAutoDetectSetting = useCallback(
    (checked: boolean) => {
      setIsAutoDetectEnabled(checked);
      window.localStorage.setItem(SETTING_AUTO_DETECT_KEY, String(checked));
      showToast(checked ? "자동 운행 종료 감지가 활성화되었습니다." : "자동 운행 종료 감지가 중단되었습니다.");
    },
    [showToast]
  );

  const registerBtDevice = useCallback(
    (deviceName: string) => {
      const trimmed = deviceName.trim();
      if (!trimmed) {
        showToast("등록할 블루투스 기기명을 입력해 주세요.", "warning");
        return;
      }
      setRegisteredBtDevice(trimmed);
      window.localStorage.setItem(SETTING_BT_DEVICE_KEY, trimmed);
      showToast(`블루투스 기기 [${trimmed}] 등록 완료`);
    },
    [showToast]
  );

  const removeBtDevice = useCallback(() => {
    setRegisteredBtDevice("");
    window.localStorage.removeItem(SETTING_BT_DEVICE_KEY);
    showToast("등록된 차량 블루투스 기기가 제거되었습니다.");
  }, [showToast]);

  const triggerSimulatedDriveStart = useCallback(() => {
    setDeviceActivity("driving");
    showToast("차량 운전 주행 상태가 감지되었습니다.");
  }, [showToast]);

  const triggerSimulatedBtConnect = useCallback(() => {
    if (!registeredBtDevice) {
      setBtAlertVisible(true);
      showToast("앱 설정에서 기기 등록이 선행되어야 합니다.", "warning");
      return;
    }
    setDeviceBtConnected(true);
    showToast(`블루투스 기기 [${registeredBtDevice}] 연결 성공`, "success");
  }, [registeredBtDevice, showToast]);

  const triggerSimulatedDriveEnd = useCallback(() => {
    const previousActivity = deviceActivity;
    const wasBtConnected = deviceBtConnected;

    setDeviceActivity("walking");
    if (wasBtConnected) setDeviceBtConnected(false);

    showToast("시동 종료 및 보행 전환 상태를 감지했습니다.");

    if (!isAutoDetectEnabled) return;

    const isBluetoothPath = Boolean(registeredBtDevice) && wasBtConnected;
    const isPureMotionPath = !registeredBtDevice && previousActivity === "driving";

    if (isBluetoothPath || isPureMotionPath) {
      window.setTimeout(() => {
        setArrivalAlert({ visible: true, isBluetoothPath });
      }, 800);
    }
  }, [deviceActivity, deviceBtConnected, isAutoDetectEnabled, registeredBtDevice, showToast]);

  const hideArrivalPushAlert = useCallback(() => {
    setArrivalAlert((prev) => ({ ...prev, visible: false }));
  }, []);

  const confirmArrivalAndRecord = useCallback(() => {
    hideArrivalPushAlert();
    navigateTo("record");
  }, [hideArrivalPushAlert, navigateTo]);

  const hideBtAlert = useCallback(() => setBtAlertVisible(false), []);

  return {
    hydrated,
    now,
    currentScreen,
    parkingRecord,
    form,
    isNotificationOpen,
    toast,
    isAutoDetectEnabled,
    registeredBtDevice,
    deviceActivity,
    deviceBtConnected,
    arrivalAlert,
    btAlertVisible,
    elapsedMinutes,

    navigateTo,
    backToPrevScreen,
    navigateToLauncher,
    shortcutToDetail,
    shortcutToApp,
    toggleNotificationShade,
    closeNotificationShade,

    updateForm,
    setFloorType,
    setFloorNum,
    triggerSimulatedCamera,
    triggerDemoPhoto,
    clearPhoto,
    autoFillMockData,
    saveParkingData,
    resetForm,

    deleteParkingRecord,
    editParking,
    clearNotif,
    addTimeOffset,

    toggleAutoDetectSetting,
    registerBtDevice,
    removeBtDevice,

    triggerSimulatedDriveStart,
    triggerSimulatedBtConnect,
    triggerSimulatedDriveEnd,
    hideArrivalPushAlert,
    confirmArrivalAndRecord,
    hideBtAlert,

    showToast,
  };
}

export type ParkingApp = ReturnType<typeof useParkingApp>;
