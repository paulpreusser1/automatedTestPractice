import { test } from '@playwright/test';
import { CustomerPage } from './pageObjects/CustomerPage_PO';

test.describe('Verify customer login and view transactions from a given range', () => {

    let customerPage;

    test.beforeEach(async ({ page }) => {
        // Initialize the page object
        customerPage = new CustomerPage(page);
    });

    test('Verify User Login and View Transactions', async () => {
        // Navigate to the login page
        await customerPage.goto();

        // Log in with user credentials
        await customerPage.login('Hermoine Granger');

        // Select the bank account
        await customerPage.selectAccount('1001');

        // View transactions within the specified date range
        await customerPage.viewTransactions('2015-03-01T15:21', '2015-03-29T23:59');

        // Assert the number of transactions
        await customerPage.countTransactions(54);
    });

    test('Verify User deposit transaction', async () => {
        // Navigate to the login page
        await customerPage.goto();

        // Log in with user credentials
        await customerPage.login('Harry Potter');

        // Select the bank account
        await customerPage.selectAccount('1005');

        // Click the 'Deposit' button
        await customerPage.depositButton.click()

        // Enter a deposit amount
        await customerPage.depositAmount.fill('1000')

        // Confirm deposit by clicking the 'Submit' button
        await customerPage.depositSubmitButton.click()
    });
});
