const { test, expect } = require('@playwright/test');

test('basic test', async ({ page }) => {
    await page.goto('https://www.monterail.com/');
    const title = await page.title();
    expect(title).toBe('AI-enhanced digital product development · Monterail');
});
