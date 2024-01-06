import { test, expect } from '@playwright/test';

test.describe('Verify customer login and view transactions from a given range', () => {

    // Test variables
    const userName = 'Hermoine Granger'; // Enter the name of the account user
    const accountNumber = '1001'; // Enter the account number
    const startDate = '2015-03-01T15:21'; // Enter the calendar start date and time to search (format: YYYY-MM-DDTHH:MM)
    const endDate = '2015-03-29T23:59'; // Enter the calendar end date to search (format: YYYY-MM-DDTHH:MM)
    const noOfTransactions = 54; // Enter the expected number of transaction results

    test('Verify User Login and View Transactions', async ({ page }) => {
        await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
        
        // Select 'Customer Login' button
        const customerLoginButton = page.locator('//button[@ng-click="customer()"]');
        await expect(customerLoginButton).toContainText('Customer Login');
        await customerLoginButton.click();

        // Select the 'Your name' selector and choose the user
        const nameSelector = page.locator('//*[@id="userSelect"]');
        await expect(nameSelector).toContainText('Your Name');
        await nameSelector.selectOption(userName);

        // Select and click the 'Login' button
        const loginButton = page.locator('//button[@type="submit"]');
        await expect(loginButton).toBeVisible();
        await expect(loginButton).toHaveText('Login');
        await loginButton.click();

        // Assert User name in the account
        const userNameDisplay = page.locator('//span[@class="fontBig ng-binding"]');
        await expect(userNameDisplay).toHaveText(userName);

        // Choose the 'Bank account number' from the selector
        const accountSelector = page.locator('//*[@id="accountSelect"]');
        await accountSelector.selectOption(accountNumber);

        // Assert correct bank account number
        const accountDisplay = page.locator('//div[@ng-hide="noAccount"]/strong[@class="ng-binding"][1]');
        await expect(accountDisplay).toContainText(accountNumber);

        // Select and click the 'Transactions' button
        const transactionsButton = page.locator('//button[@ng-click="transactions()"]');
        await expect(transactionsButton).toContainText('Transactions');
        await transactionsButton.click();

        // Select 'Calendar Date' field — Start date filter
        const startDateField = page.locator('//*[@id="start"]');
        await startDateField.fill(startDate);

        // Select calendar date field — End date filter
        const endDateField = page.locator('//*[@id="end"]');
        await endDateField.fill(endDate);

        // Assert that there are 54 transactions from the selected date range
        const transactions = page.locator('//tr[starts-with(@id, "anchor")]');
        await expect(transactions).toHaveCount(noOfTransactions);
    });
});
