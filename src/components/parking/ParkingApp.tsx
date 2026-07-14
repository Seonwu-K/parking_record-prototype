"use client";

import { useParkingApp } from "./useParkingApp";
import { SensorGuidePanel } from "./SensorGuidePanel";
import { NotificationShade } from "./NotificationShade";
import { ArrivalPushAlert } from "./ArrivalPushAlert";
import { BtAlertModal } from "./BtAlertModal";
import { Toast } from "./Toast";
import { HomeEmptyScreen } from "./screens/HomeEmptyScreen";
import { HomeSavedScreen } from "./screens/HomeSavedScreen";
import { RecordScreen } from "./screens/RecordScreen";
import { SuccessScreen } from "./screens/SuccessScreen";
import { DetailScreen } from "./screens/DetailScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { SystemLauncherScreen } from "./screens/SystemLauncherScreen";

export function ParkingApp() {
  const app = useParkingApp();

  if (!app.hydrated) {
    return <div className="min-h-screen bg-slate-100" />;
  }

  return (
    <div className="min-h-screen text-slate-800 flex flex-col lg:flex-row overflow-x-hidden">
      <SensorGuidePanel
        deviceActivity={app.deviceActivity}
        deviceBtConnected={app.deviceBtConnected}
        registeredBtDevice={app.registeredBtDevice}
        onDriveStart={app.triggerSimulatedDriveStart}
        onBtConnect={app.triggerSimulatedBtConnect}
        onDriveEnd={app.triggerSimulatedDriveEnd}
      />

      <main className="flex-1 flex justify-center items-center p-4 lg:p-8 bg-slate-100 min-h-[700px]">
        <div className="w-full max-w-[390px] h-[780px] bg-slate-900 rounded-[50px] shadow-2xl border-[12px] border-slate-900 relative overflow-hidden flex flex-col ring-8 ring-slate-800/10 shrink-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-900 rounded-b-3xl z-50 flex justify-center items-center">
            <div className="w-12 h-1.5 bg-slate-800 rounded-full mb-1"></div>
          </div>

          <div
            onClick={app.toggleNotificationShade}
            className="h-10 bg-white px-6 pt-2 flex justify-between items-center text-xs font-semibold text-slate-800 z-50 shrink-0 cursor-pointer select-none hover:bg-slate-100/80 transition-colors relative"
          >
            <span>{app.now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })}</span>

            <div className="absolute left-1/2 top-4 -translate-x-1/2 opacity-50">
              <div className="w-6 h-1 bg-slate-400 rounded-full"></div>
            </div>

            <div className="flex items-center gap-1.5">
              {app.parkingRecord?.isTimeTrackEnabled && (
                <i className="fa-solid fa-clock text-indigo-600 animate-pulse"></i>
              )}
              {app.parkingRecord && <i className="fa-solid fa-square-parking text-indigo-600"></i>}
              <i className="fa-solid fa-wifi"></i>
              <i className="fa-solid fa-signal"></i>
              <div className="flex items-center gap-0.5">
                <span className="text-[10px]">98%</span>
                <i className="fa-solid fa-battery-full text-emerald-600"></i>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-slate-50 flex flex-col relative overflow-hidden select-none">
            <NotificationShade
              isOpen={app.isNotificationOpen}
              now={app.now}
              record={app.parkingRecord}
              elapsedMinutes={app.elapsedMinutes}
              onToggle={app.toggleNotificationShade}
              onClear={app.clearNotif}
              onOpenDetail={app.shortcutToDetail}
              onAddTimeOffset={app.addTimeOffset}
            />

            <SystemLauncherScreen
              active={app.currentScreen === "system-launcher"}
              now={app.now}
              record={app.parkingRecord}
              elapsedMinutes={app.elapsedMinutes}
              onNavigate={app.navigateTo}
              onShortcutToApp={app.shortcutToApp}
              onShortcutToDetail={app.shortcutToDetail}
              onAddTimeOffset={app.addTimeOffset}
            />

            <HomeEmptyScreen active={app.currentScreen === "home-empty"} onNavigate={app.navigateTo} />

            {app.parkingRecord && (
              <HomeSavedScreen
                active={app.currentScreen === "home-saved"}
                record={app.parkingRecord}
                elapsedMinutes={app.elapsedMinutes}
                onNavigate={app.navigateTo}
                onDelete={app.deleteParkingRecord}
                onAddTimeOffset={app.addTimeOffset}
              />
            )}

            <RecordScreen
              active={app.currentScreen === "record"}
              form={app.form}
              onBack={app.backToPrevScreen}
              onUpdateForm={app.updateForm}
              onSetFloorType={app.setFloorType}
              onSetFloorNum={app.setFloorNum}
              onTriggerCamera={app.triggerSimulatedCamera}
              onTriggerDemoPhoto={app.triggerDemoPhoto}
              onClearPhoto={app.clearPhoto}
              onAutoFill={app.autoFillMockData}
              onSave={app.saveParkingData}
            />

            <SuccessScreen
              active={app.currentScreen === "success"}
              record={app.parkingRecord}
              onGoHome={() => app.navigateTo("home-saved")}
            />

            <DetailScreen
              active={app.currentScreen === "detail"}
              record={app.parkingRecord}
              onBack={() => app.navigateTo("home-saved")}
              onEdit={app.editParking}
              onDelete={app.deleteParkingRecord}
              onRecordNew={() => {
                app.resetForm();
                app.navigateTo("record");
              }}
            />

            <SettingsScreen
              active={app.currentScreen === "settings"}
              isAutoDetectEnabled={app.isAutoDetectEnabled}
              registeredBtDevice={app.registeredBtDevice}
              onBack={app.backToPrevScreen}
              onToggleAutoDetect={app.toggleAutoDetectSetting}
              onRegisterBtDevice={app.registerBtDevice}
              onRemoveBtDevice={app.removeBtDevice}
            />

            <ArrivalPushAlert
              visible={app.arrivalAlert.visible}
              isBluetoothPath={app.arrivalAlert.isBluetoothPath}
              registeredBtDevice={app.registeredBtDevice}
              onDismiss={app.hideArrivalPushAlert}
              onConfirm={app.confirmArrivalAndRecord}
            />

            <BtAlertModal
              visible={app.btAlertVisible}
              onClose={app.hideBtAlert}
              onOpenSettings={() => {
                app.hideBtAlert();
                app.navigateTo("settings");
              }}
            />

            <Toast toast={app.toast} />
          </div>

          <div className="h-12 bg-white flex justify-around items-center text-slate-400 text-sm border-t border-slate-100 z-40 shrink-0 select-none">
            <button onClick={app.backToPrevScreen} className="hover:text-slate-700 w-12 h-12 flex items-center justify-center">
              <i className="fa-solid fa-play fa-rotate-180 text-xs"></i>
            </button>

            <button onClick={app.navigateToLauncher} className="hover:text-slate-700 w-12 h-12 flex items-center justify-center">
              <span className="w-4 h-4 rounded-full border-2 border-slate-400 hover:border-slate-700 inline-block"></span>
            </button>

            <button
              onClick={() => app.showToast("마지막 주차 프로토타입 v2.3 입니다.")}
              className="hover:text-indigo-600 w-12 h-12 flex items-center justify-center"
            >
              <i className="fa-regular fa-square text-xs"></i>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
