import { Page, Locator } from '@playwright/test';

class HomePage {
    page: any;
    getStartedButton: Locator;
    headingText: Locator;
    searchIcon: Locator;
    navigationLinks: Locator;


constructor(page) {
    this.page = page;
    this.getStartedButton = page.locator('[id="get-started"]');
    this.headingText = page.locator('text=Think different. Make different.');
    this.searchIcon = page.locator('//div[@class="zak-header-actions zak-header-actions--desktop"]//a[@class="zak-header-search__toggle"]');
    this.navigationLinks = page.locator('#zak-primary-menu li[id*=menu]')
}

async navigateTo() {
    await this.page.goto('https://practice.sdetunicorns.com/');
  }

  getNavigationLinksText() {
    return this.navigationLinks.allTextContents()
  }

}

export default HomePage;