import { test, expect } from '@playwright/test';
import { login } from './utils-test';

test.describe('Creates a strategy', () => {
  test("should report an error when you haven't entered yet and click create strategy", async () => {
    const { page, browser } = await login();
    await page.goto(`/views/pages/setup/add`);
    await page.click('button[type="submit"]');

    await expect(page.getByText('Please choose strategy group.')).toBeVisible();
    await browser.close();
  });

  test('should navigate to the setup page when create successfully', async () => {
    const { browser, page } = await login( );

    const setFormStrategy = async () => {
      await page.goto(`/views/pages/setup/add`);
      await page.waitForSelector('.strategy_add');
      // select option
      await page.getByTestId('strategy_group').click();
      await page.click('div[title="Group 1"]');

      await page.getByTestId('timeframe').click();
      await page.click('div[title="5 minutes"]');

      await page.getByTestId('backtest_timeframes').click();
      await page.click('div[title="90"]');

      await page.getByTestId('exclude_symbols').click();
      await page.click('div[title="PARA"]');

      await page.getByTestId('include_symbols').click();
      await page.click('div[title="RUN"]');
      // input
      await page.fill('input[name="strategy_name"]', 'ORB');
      await page.fill('input[name="risk_ratio"]', '1');
      await page.fill('input[name="max_profit"]', '21');
      await page.fill('input[name="max_range"]', '21');
      await page.fill('input[name="min_range"]', '2');
      await page.fill('input[name="close_time"]', '18:30');
      await page.fill('input[name="min_daily"]', '30');
      await page.fill('input[name="min_win_rate"]', '10');
      // radio
      await page.click('input[value="true"]');
      //submit
      await page.click('button[type="submit"]');

      await page.waitForSelector('.strategy');
      const url = page.url();
      const isRedirected = url.includes('/views/pages/setup');
      expect(isRedirected).toBe(true);
    };
    await setFormStrategy();
  });
});

test.describe('Live Strategy', () => {
  test('should start the strategy on click and if started then stop it', async () => {
    const { page, browser } = await login( );
    await page.goto(`/views/pages/setup`);
    await page.waitForSelector('tr.ant-table-row');
    const hasStop = await page.$('button.btn-stop');

    if (hasStop) {
      hasStop.click();
      const successMessage = await page.textContent(
        '.ant-notification-notice-message'
      );
      expect(successMessage).toContain('Save success');
      return;
    } else {
      const buttonStart = await page.getByTestId('btn-start');
      buttonStart.click();
      await page.waitForSelector('.ant-modal-content');
      const selectAccount = await page.$('span.ant-select-selection-item');

      if (!selectAccount) {
        await page.getByTestId('select_account').click();
        const buttonMoney = await page.$('div[title="money"]');
        if (buttonMoney) {
          buttonMoney.click();
        } else {
          await page.click('div[title="paper"]');
        }
      }
      await page.click('button[type="submit"]');
      const successMessage = await page.textContent(
        '.ant-notification-notice-message'
      );
      expect(successMessage).toContain('Save success');
    }
    await browser.close();
  });
});
