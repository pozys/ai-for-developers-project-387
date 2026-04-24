export const TIMEZONES = [
  { value: "America/Los_Angeles", label: "Лос-Анджелес (UTC-8)" },
  { value: "America/New_York", label: "Нью-Йорк (UTC-5)" },
  { value: "UTC", label: "UTC (UTC+0)" },
  { value: "Europe/London", label: "Лондон (UTC+0)" },
  { value: "Europe/Paris", label: "Париж (UTC+1)" },
  { value: "Europe/Moscow", label: "Москва (UTC+3)" },
  { value: "Asia/Dubai", label: "Дубай (UTC+4)" },
  { value: "Asia/Singapore", label: "Сингапур (UTC+8)" },
  { value: "Asia/Tokyo", label: "Токио (UTC+9)" },
  { value: "Australia/Sydney", label: "Сидней (UTC+11)" },
];

export const DEFAULT_TIMEZONE = "Europe/Moscow";

const STORAGE_KEY = "user-settings";

import { type UserSettings } from "@/types/api";

export function loadSettings(): UserSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return { timezone: DEFAULT_TIMEZONE };
}

export function saveSettings(settings: UserSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
