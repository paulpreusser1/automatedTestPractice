import { Page, expect } from '@playwright/test';

export class CustomerPage {
    private page: Page;
    private customerLoginButton: Locator;
    private nameSelector: Locator;
    private loginButton: Locator;
    private userNameDisplay: Locator;
    private accountSelector: Locator;
    private accountDisplay: Locator;
    private transactionsButton: Locator;
    private depositButton: Locator;
    private depositAmount: Locator;
    private depositSubmitButton: Locator;
    private withdrawalButton: Locator;
    private startDateField: Locator;
    private endDateField: Locator;
    private transactions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.customerLoginButton = page.locator('//button[@ng-click="customer()"]');
        this.nameSelector = page.locator('//*[@id="userSelect"]');
        this.loginButton = page.locator('//button[@type="submit"]');
        this.userNameDisplay = page.locator('//span[@class="fontBig ng-binding"]');
        this.accountSelector = page.locator('//*[@id="accountSelect"]');
        this.accountDisplay = page.locator('//div[@ng-hide="noAccount"]/strong[@class="ng-binding"][1]');
        this.transactionsButton = page.locator('//button[@ng-click="transactions()"]');
        this.depositButton = page.locator('//button[@ng-click="deposit()"]');
        this.depositSubmitButton = page.locator('//button[@type="submit"]')
        this.depositAmount = page.locator('//input[@ng-model="amount"]');
        this.withdrawalButton = page.locator('//button[@ng-click="withdrawl()"]');
        this.startDateField = page.locator('//*[@id="start"]');
        this.endDateField = page.locator('//*[@id="end"]');
        this.transactions = page.locator('//tr[starts-with(@id, "anchor")]');
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
    }

    async login(userName: string): Promise<void> {
        await this.customerLoginButton.click();
        await this.nameSelector.selectOption(userName);
        await this.loginButton.click();
        await expect(this.userNameDisplay).toHaveText(userName);
    }

    async selectAccount(accountNumber: string): Promise<void> {
        await this.accountSelector.selectOption(accountNumber);
        await expect(this.accountDisplay).toContainText(accountNumber);
    }

    async viewTransactions(startDate: string, endDate: string): Promise<void> {
        await this.transactionsButton.click();
        await this.startDateField.fill(startDate);
        await this.endDateField.fill(endDate);
    }

    async countTransactions(expectedCount: number): Promise<void> {
        await expect(this.transactions).toHaveCount(expectedCount);
    }
}
