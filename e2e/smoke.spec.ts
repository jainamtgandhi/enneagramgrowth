import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/The Practice/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("library page loads", async ({ page }) => {
    await page.goto("/library");
    await expect(
      page.getByRole("heading", { name: /Library/i })
    ).toBeVisible();
  });

  test("blog page loads", async ({ page }) => {
    await page.goto("/blog");
    await expect(
      page.getByRole("heading", { name: /Blog/i })
    ).toBeVisible();
  });

  test("discovery page loads with start button", async ({ page }) => {
    await page.goto("/discovery");
    await expect(
      page.getByRole("heading", { name: /Discover Your Type/i })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Start Discovery/i })
    ).toBeVisible();
  });

  test("navigation links work", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Library/i }).first().click();
    await expect(page).toHaveURL(/\/library/);
  });

  test("privacy page loads", async ({ page }) => {
    await page.goto("/privacy");
    await expect(
      page.getByRole("heading", { name: /Privacy/i })
    ).toBeVisible();
  });

  test("404 page shows for unknown routes", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await expect(page.getByText(/not found/i)).toBeVisible();
  });
});

test.describe("Quiz flow", () => {
  test("can start quiz from discovery page", async ({ page }) => {
    await page.goto("/discovery");
    await page.getByRole("link", { name: /Start Discovery/i }).click();
    await expect(page).toHaveURL(/\/discovery\/quiz/);
  });
});
