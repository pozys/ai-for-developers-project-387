import { expect, test } from "@playwright/test";

const EXPECTED_TIMEZONES = [
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

test.describe("Выбор часового пояса", () => {
  test("отображает часовые пояса в порядке возрастания UTC", async ({
    page,
  }) => {
    await page.goto("/");

    const timezoneSelect = page.getByLabel("Часовой пояс");
    await timezoneSelect.scrollIntoViewIfNeeded();

    const options = await timezoneSelect.locator("option").all();
    const optionTexts = await Promise.all(
      options.map(async (option) => {
        const value = await option.value();
        const text = await option.textContent();
        return { value, text: text ?? "" };
      }),
    );

    const actualTimezones = optionTexts.map((opt) => ({
      value: opt.value,
      label: opt.text,
    }));

    expect(actualTimezones).toEqual(EXPECTED_TIMEZONES);
  });

  test("сохраняет выбранный часовой пояс в localStorage", async ({ page }) => {
    await page.goto("/");

    const timezoneSelect = page.getByLabel("Часовой пояс");
    await timezoneSelect.selectOption("Asia/Tokyo");

    const stored = await page.evaluate(() => {
      return localStorage.getItem("user-settings");
    });
    expect(stored).toContain("Asia/Tokyo");
  });
});
