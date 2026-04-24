import { useCallback } from "react";

import { loadSettings, saveSettings, TIMEZONES } from "./timezone.constants";

export function useUserSettings() {
  const settings = loadSettings();

  const setTimezone = useCallback((timezone: string) => {
    const newSettings = { timezone };
    saveSettings(newSettings);
    window.dispatchEvent(new CustomEvent("user-settings-changed", { detail: newSettings }));
  }, []);

  return { settings, setTimezone, TIMEZONES };
}