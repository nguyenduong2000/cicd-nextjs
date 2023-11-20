import { LaunchOptions, chromium } from '@playwright/test';

export const login = async (option?: LaunchOptions) => {
  const email = 'duongcoi1803@gmail.com';
  const password = 'duongcoi1803';

  const browser = await chromium.launch(option);
  const page = await browser.newPage();
  await page.goto(`/views/signin`);
  await page.waitForSelector('.supabase-auth-ui_ui-container');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL('**/scoreboard');
  return {
    browser,
    page
  };
};
