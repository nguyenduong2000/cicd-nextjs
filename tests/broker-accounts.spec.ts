import { test, expect } from '@playwright/test';
import { login } from './utils-test';

test.describe('Creates a broker account', () => {
  test('validation create broker account', async () => {
    const { page, browser } = await login( );
    await page.goto(`/views/pages/account`);

    const tab = await page.$('[data-node-key="broker_account"]');
    await tab.click();

    await page.getByText('Create Broker Account').click();

    await page.click('button[type="submit"]');

    await expect(page.getByText('Please select type.')).toBeVisible();
    await browser.close();
  });

  test('should navigate to the broker account page when create successfully', async () => {
    const { browser, page } = await login( );
    await page.goto(`/views/pages/account`);

    const setFormStrategy = async () => {
      await page.waitForSelector('.account-tab');
      const tab = await page.$('[data-node-key="broker_account"]');
      await tab.click();

      await page.getByText('Create Broker Account').click();
      // select option
      await page.getByTestId('broker_type').click();
      await page.click('div[title="Paper"]');

      await page.getByTestId('brokers').click();
      await page.click('div[title="Paper Money"]');
      await page.fill('input[name="account_amount"]', '100');

      // input
      await page.fill('input[name="amount"]', '100000');

      // submit
      await page.click('button[type="submit"]');
      const successMessage = await page.textContent(
        '.ant-notification-notice-message'
      );
      expect(successMessage).toContain('Create broker success');
    };
    await setFormStrategy();
    await browser.close();
  });
});
