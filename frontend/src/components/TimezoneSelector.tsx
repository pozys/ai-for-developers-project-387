import { useCallback } from "react";

import { Label } from "@/components/ui/label";
import {
  type UserSettings,
  type UserSettings as SavedSettings,
} from "@/types/api";

const STORAGE_KEY = "user-settings";

const TIMEZONES = [
  { value: "Europe/Moscow", label: "Москва (UTC+3)" },
  { value: "Europe/London", label: "Лондон (UTC+0)" },
  { value: "Europe/Paris", label: "Париж (UTC+1)" },
  { value: "America/New_York", label: "Нью-Йорк (UTC-5)" },
  { value: "America/Los_Angeles", label: "Лос-Анджелес (UTC-8)" },
  { value: "Asia/Tokyo", label: "Токио (UTC+9)" },
  { value: "Asia/Dubai", label: "Дубай (UTC+4)" },
  { value: "Asia/Singapore", label: "Сингапур (UTC+8)" },
  { value: "Australia/Sydney", label: "Сидней (UTC+11)" },
  { value: "UTC", label: "UTC (UTC+0)" },
];

function loadSettings(): UserSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return { timezone: "Europe/Moscow" };
}

function saveSettings(settings: SavedSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function useUserSettings() {
  const settings = loadSettings();

  const setTimezone = useCallback((timezone: string) => {
    const newSettings = { timezone };
    saveSettings(newSettings);
    window.dispatchEvent(new CustomEvent("user-settings-changed", { detail: newSettings }));
  }, []);

  return { settings, setTimezone, TIMEZONES };
}

export function TimezoneSelector() {
  const { settings, setTimezone, TIMEZONES } = useUserSettings();

  return (
    <div className="flex items-center gap-2">
      <Label className="text-sm" htmlFor="timezone-select">
        Часовой пояс
      </Label>
      <select
        id="timezone-select"
        className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
        value={settings.timezone}
        onChange={(e) => setTimezone(e.target.value)}
      >
        {TIMEZONES.map((tz) => (
          <option key={tz.value} value={tz.value}>
            {tz.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export { TIMEZONES };