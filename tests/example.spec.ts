import { test, expect } from '@playwright/test';

test.describe('My tests', () => {
  test.beforeAll(async () => {
    console.log("Before tests");
  });

  test("has title", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });


  test("has title, use loading options", async ({ page }) => {
    await page.goto("http://playwright.dev/", {
      waitUntil: "domcontentloaded",
    });

    await expect(page).toHaveTitle(/Playwright/);
  })

  test("get started link", async ({ page }) => {
    await page.goto("https://playwright.dev/");

    // Click the get started link.
    await page.getByRole("link", { name: "Get started" }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole("heading", { name: "Installation" })
    ).toBeVisible();
  });

  test("test using a browser context", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://playwright.dev");
    let content: string = await page.content();

    expect(content).toContain("Playwright");

    await context.close();
  });

  test("test to get browser image using locator", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const logo = page.locator("main div img").first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("alt", "Browsers (Chromium, Firefox, WebKit)");
  });

    test("test multiple elements in on assert", async ({ page }) => {
      const expectedLinks = [
        "Docs",
        "API",
        "Node.js",
        "Community",
        "",
        "",
      ];
      
      await page.goto("https://playwright.dev/");
      const navLinks = page.locator("#__docusaurus .navbar .navbar__inner .navbar__items .navbar__link");
      const navLinkTexts = await navLinks.allInnerTexts(); 
      expect(navLinkTexts).toEqual(expectedLinks);
    });


  test.afterAll(async () => {
    console.log("after tests");
  });
});
