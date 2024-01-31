import { test, expect } from '@playwright/test';
import HomePage from '../Sdet-U_Project/PageObjects/Homepage_PO.ts';

test.describe('Homepage Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateTo()
  })

  test('Open HomePage and verify title', async ({ page }) => {
    // verify title
    await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns – Helping you succeed in Software Quality.');
  })

  test('Click get started button using CSS Selector', async ({ page }) => {
    await expect(page).not.toHaveURL(/.*#get-started/);
    // click the button
    await homePage.getStartedButton.click()    
    // verify url has #get-started
    await expect(page).toHaveURL(/.*#get-started/);
  })

  test('Verify text for all navigation links', async ({ page }) => {
    const expectedLinks = [
        "Home",
        "About",
        "Shop",
        "Blog",
        "Contact",
        "My account",
    ];

    // verify nav links text
    expect(await homePage.getNavigationLinksText()).toEqual(expectedLinks);

    })


})