// import { expect, test } from '@playwright/test';
// import { login } from './utils-test';

// test.describe('Setup', () => {
//   test('should save setup', async () => {
//     const { page } = await login( );
//     await page.goto(`/views/pages/setup`);
//     await page.waitForSelector('.ant-form-item');
//     await page.waitForTimeout(1000);
//     const api_token = await page.$('input[name="qc_api_token"]');
//     const inputValue = await api_token.inputValue();
//     if (inputValue === '') {
//       await page.fill('input[name="qc_api_token"]', 'test');
//       await page.fill('input[name="qc_project_id"]', 'project_id');
//       await page.fill('input[name="qc_api_user_id"]', 'api user id');
//     }
//     await page.click('button[type="submit"]');
//     const successMessage = await page.textContent(
//       '.ant-notification-notice-message'
//     );
//     expect(successMessage).toContain('Save setup success.');
//   });
// });
