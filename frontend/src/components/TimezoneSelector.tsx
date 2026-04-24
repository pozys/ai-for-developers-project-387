import { Label } from "@/components/ui/label";
import { useUserSettings } from "./useUserSettings";

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