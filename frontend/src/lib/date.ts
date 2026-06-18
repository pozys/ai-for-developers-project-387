const TIMEZONES = [
  { value: "Europe/Moscow", label: "Москва (UTC+3)" },
  { value: "Europe/London", label: "Лондон (UTC+0)" },
  { value: "Europe/Paris", label: "Париж (UTC+1)" },
  { value: "Europe/Berlin", label: "Берлин (UTC+1)" },
  { value: "America/New_York", label: "Нью-Йорк (UTC-5)" },
  { value: "America/Los_Angeles", label: "Лос-Анджелес (UTC-8)" },
  { value: "Asia/Tokyo", label: "Токио (UTC+9)" },
  { value: "Asia/Dubai", label: "Дубай (UTC+4)" },
  { value: "Asia/Singapore", label: "Сингапур (UTC+8)" },
  { value: "UTC", label: "UTC (UTC+0)" },
] as const;

export type TimeZone = (typeof TIMEZONES)[number]["value"];

const MOSCOW_TIME_ZONE = "Europe/Moscow";
const DEFAULT_TIMEZONE: TimeZone = "Europe/Moscow";

function getStoredTimezone(): TimeZone {
  if (typeof window === "undefined") {
    return DEFAULT_TIMEZONE;
  }

  const stored = localStorage.getItem("timezone");
  if (stored && TIMEZONES.some((tz) => tz.value === stored)) {
    return stored as TimeZone;
  }
  return DEFAULT_TIMEZONE;
}

export function getTimezone(): TimeZone {
  return getStoredTimezone();
}

export function setTimezone(timezone: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("timezone", timezone);
  }
}

export { TIMEZONES, MOSCOW_TIME_ZONE };

function getUtcDateFromDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(Date.UTC(year, month - 1, day));
}

function formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("ru-RU", options).format(date);
}

export function formatDateLabel(dateKey: string) {
  return formatDate(getUtcDateFromDateKey(dateKey), {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function getCurrentTimezone(): string {
  return getTimezone();
}

export function formatTimeLabel(dateTime: string) {
  return formatDate(new Date(dateTime), {
    timeZone: getCurrentTimezone(),
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatDateTimeLabel(dateTime: string) {
  return `${formatDateLabel(dateTime.slice(0, 10))}, ${formatTimeLabel(dateTime)}`;
}

export function formatSlotRange(startTime: string, endTime: string) {
  return `${formatTimeLabel(startTime)} - ${formatTimeLabel(endTime)}`;
}
