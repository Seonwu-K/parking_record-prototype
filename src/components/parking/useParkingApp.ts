"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DEMO_PARKING_PHOTOS,
  LEGACY_STORAGE_KEY,
  SETTING_AUTO_SAVE_KEY,
  STORAGE_KEY,
  buildFloorLabel,
  formatTimestamp,
  generateAccuracyMeters,
} from "./constants";
import type {
  AutoSaveNoticeState,
  DeviceActivity,
  ParkingFormState,
  ParkingRecord,
  RecordSource,
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
};

function loadStoredRecord(): ParkingRecord | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as ParkingRecord;
    if (!parsed.savedAtTimestamp) {
      parsed.savedAtTimestamp = Date.now();
    }
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

  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);
  const [deviceActivity, setDeviceActivity] = useState<DeviceActivity>("resting");

  const [autoSaveNotice, setAutoSaveNotice] = useState<AutoSaveNoticeState>({
    visible: false,
    accuracyMeters: 0,
  });

  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastNotifiedThresholdRef = useRef(0);
  const parkingRecordRef = useRef<ParkingRecord | null>(null);
  useEffect(() => {
    parkingRecordRef.current = parkingRecord;
  }, [parkingRecord]);

  // 초기 로드: localStorage(외부 저장소)에 있던 주차 기록/설정을 마운트 시 한 번만 동기화한다.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const record = loadStoredRecord();
    if (record) {
      setParkingRecord(record);
      setCurrentScreen("home-saved");
      setScreenHistory(["home-saved"]);
    }

    const isAutoStr = window.localStorage.getItem(SETTING_AUTO_SAVE_KEY);
    if (isAutoStr !== null) setIsAutoSaveEnabled(isAutoStr === "true");

    window.localStorage.removeItem(LEGACY_STORAGE_KEY);

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

  // parkingRecord를 막 저장한 직후(같은 이벤트 틱)에는 ref 동기화 effect가 아직 돌지 않았을 수 있으므로,
  // navigateTo의 "기록 없으면 home-empty로" 가드를 거치지 않고 곧장 home-saved로 이동시킨다.
  const goToHomeSavedNow = useCallback(() => {
    setIsNotificationOpen(false);
    setCurrentScreen("home-saved");
    setScreenHistory(["home-saved"]);
  }, []);

  const navigateTo = useCallback((screenId: ScreenId, options?: { replaceHistory?: boolean }) => {
    setIsNotificationOpen(false);

    const nextScreen: ScreenId = screenId === "home-saved" && !parkingRecordRef.current ? "home-empty" : screenId;

    setCurrentScreen(nextScreen);
    setScreenHistory((prevHistory) => {
      if (options?.replaceHistory) return [nextScreen];
      if (prevHistory[prevHistory.length - 1] === nextScreen) return prevHistory;
      return [...prevHistory, nextScreen];
    });
  }, []);

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
    navigateTo(parkingRecord ? "detail" : "home-empty");
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
    });
    showToast("지하 2층 A-13 정보가 입력되었습니다.");
  }, [showToast]);

  // 현재 위치 + 시간을 새 주차 기록으로 즉시 저장한다 (자동 감지 또는 수동 버튼 모두 이 함수를 탄다).
  const saveLocationSnapshot = useCallback(
    (source: RecordSource) => {
      const savedAt = new Date();
      const record: ParkingRecord = {
        floorType: "",
        floorNum: "",
        customFloorValue: "",
        floor: "",
        zone: "",
        photo: null,
        memo: "",
        timestamp: formatTimestamp(savedAt),
        savedAtTimestamp: savedAt.getTime(),
        accuracyMeters: generateAccuracyMeters(),
        source,
      };

      setParkingRecord(record);
      setTimeOffsetMinutes(0);
      lastNotifiedThresholdRef.current = 0;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      resetForm();

      return record;
    },
    [resetForm]
  );

  const recordLocationManually = useCallback(() => {
    saveLocationSnapshot("manual");
    goToHomeSavedNow();
    showToast("현재 위치가 저장되었습니다.", "success");
  }, [goToHomeSavedNow, saveLocationSnapshot, showToast]);

  // 층/구역/사진/메모 같은 선택 정보만 저장 (위치·시간은 이미 저장되어 있음)
  const saveDetails = useCallback(() => {
    if (form.floorNum === "custom" && !form.customFloorValue.trim()) {
      showToast("직접 입력할 층 정보를 작성해 주세요.", "warning");
      return;
    }

    setParkingRecord((prev) => {
      if (!prev) return prev;

      const updated: ParkingRecord = {
        ...prev,
        floorType: form.floorType,
        floorNum: form.floorNum,
        customFloorValue: form.customFloorValue,
        floor: buildFloorLabel(form.floorType, form.floorNum, form.customFloorValue),
        zone: form.zone.trim(),
        photo: form.photo,
        memo: form.memo.trim(),
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    navigateTo("detail");
    showToast("정보가 저장되었습니다.", "success");
  }, [form, navigateTo, showToast]);

  const deleteParkingRecord = useCallback(() => {
    setParkingRecord(null);
    setTimeOffsetMinutes(0);
    lastNotifiedThresholdRef.current = 0;
    setIsNotificationOpen(false);

    window.localStorage.removeItem(STORAGE_KEY);

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
      zone: parkingRecord.zone,
      photo: parkingRecord.photo,
      memo: parkingRecord.memo,
    });

    navigateTo("record");
  }, [navigateTo, parkingRecord]);

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
    if (!parkingRecord) return;
    if (elapsedMinutes > 0 && elapsedMinutes % 30 === 0 && lastNotifiedThresholdRef.current !== elapsedMinutes) {
      lastNotifiedThresholdRef.current = elapsedMinutes;
      showToast(`[알림] 주차 시간 ${elapsedMinutes}분 경과`, "warning");
    }
  }, [elapsedMinutes, parkingRecord, showToast]);

  const toggleAutoSaveSetting = useCallback(
    (checked: boolean) => {
      setIsAutoSaveEnabled(checked);
      window.localStorage.setItem(SETTING_AUTO_SAVE_KEY, String(checked));
      showToast(checked ? "운전 종료 시 위치 자동 저장이 켜졌습니다." : "자동 저장이 꺼졌습니다.");
    },
    [showToast]
  );

  const triggerSimulatedDriveStart = useCallback(() => {
    setDeviceActivity("driving");
    showToast("차량 운전 주행 상태가 감지되었습니다.");
  }, [showToast]);

  const triggerSimulatedDriveEnd = useCallback(() => {
    const previousActivity = deviceActivity;
    setDeviceActivity("walking");
    showToast("시동 종료 및 보행 전환 상태를 감지했습니다.");

    if (!isAutoSaveEnabled || previousActivity !== "driving") return;

    window.setTimeout(() => {
      const record = saveLocationSnapshot("auto");
      setAutoSaveNotice({ visible: true, accuracyMeters: record.accuracyMeters });
      goToHomeSavedNow();
    }, 800);
  }, [deviceActivity, goToHomeSavedNow, isAutoSaveEnabled, saveLocationSnapshot, showToast]);

  const hideAutoSaveNotice = useCallback(() => {
    setAutoSaveNotice((prev) => ({ ...prev, visible: false }));
  }, []);

  const goAddDetailsFromNotice = useCallback(() => {
    hideAutoSaveNotice();
    navigateTo("record");
  }, [hideAutoSaveNotice, navigateTo]);

  return {
    hydrated,
    now,
    currentScreen,
    parkingRecord,
    form,
    isNotificationOpen,
    toast,
    isAutoSaveEnabled,
    deviceActivity,
    autoSaveNotice,
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
    saveDetails,
    resetForm,
    recordLocationManually,

    deleteParkingRecord,
    editParking,
    clearNotif,
    addTimeOffset,

    toggleAutoSaveSetting,

    triggerSimulatedDriveStart,
    triggerSimulatedDriveEnd,
    hideAutoSaveNotice,
    goAddDetailsFromNotice,

    showToast,
  };
}

export type ParkingApp = ReturnType<typeof useParkingApp>;
