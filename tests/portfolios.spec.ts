import { expect, test } from '@playwright/test';
import { login } from './utils-test';

test.describe('Portfolios', () => {
  test('should see the trading chart flowing into the portfolio view', async () => {
    const { page, browser } = await login();

    const chartSelector = 'svg.highcharts-root';
    await page.waitForSelector(chartSelector);

    const isChartVisible = await page.isVisible(chartSelector);
    expect(isChartVisible).toBe(true);
    browser.close();
  });

  test('should see the trading table flowing into the portfolio view', async () => {
    const { page, browser } = await login();
    await expect(page.getByText('Trades')).toBeVisible();
    browser.close();
  });
});

test.describe('Chart portfolios', () => {
  test('should display chart data by date when clicked button', async () => {
    const { page, browser } = await login( );
    await page.waitForSelector('.highcharts-root');
    await page.waitForSelector('.highcharts-background');
    const gElements = await page.$$('svg g.highcharts-no-tooltip');
    for (const gElement of gElements) {
      const textElement = await gElement.$('text');
      if (textElement) {
        const textContent = await textElement.textContent();
        if (
          textContent.includes('1D') ||
          textContent.includes('5D') ||
          textContent.includes('1M') ||
          textContent.includes('YTD')
        ) {
          await gElement.click();
          await page.waitForTimeout(1000);
          expect(['1D', '5D', '1M', 'YTD']).toContain(textContent);
        }
      }
    }

    browser.close();
  });
});

test.describe('Chart portfolios', () => {
  test('', async () => {
    const { page, browser } = await login( );
    await page.waitForSelector('.table-trades');
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(1000);
    await page.locator('.ant-collapse-header').first().click();
    await page.waitForSelector('.ant-collapse-content');
    const textTime = await page
      .getByTestId('time-collapse')
      .first()
      .innerHTML();
    expect(textTime).toBe('time');
    browser.close();
  });
});
