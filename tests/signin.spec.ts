import { test, expect, chromium } from '@playwright/test';
import { login } from './utils-test';

test.describe('User logins', () => {
  test('should navigate to the scoreboard page when login successfully', async () => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    const { page } = await login();
    const url = page.url();
    const isRedirected = url.includes('/views/pages/scoreboard');
    expect(isRedirected).toBe(true);
  });
});

test.describe('User registers', () => {
  test('should display message when resgiter', async ({}) => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    // click register page
    await page.goto(`/views/signin`);
    await page.click('a[href="#auth-sign-up"]');

    await page.fill('input[name="email"]', 'duong1@gmail.com');
    await page.fill('input[name="password"]', 'Duongcoi123');
    await page.click('button[type="submit"]');

    const successMessage = await page.textContent(
      '.supabase-auth-ui_ui-message'
    );
    expect([
      'Check your email for the confirmation link',
      'Email rate limit exceeded'
    ]).toContain(successMessage);
  });
});
