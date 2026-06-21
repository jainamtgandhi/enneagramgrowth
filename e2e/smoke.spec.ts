import { test, expect } from "@playwright/test";

test.describe("Smoke tests", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Enneagram Growth/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("enneagram hub loads", async ({ page }) => {
    await page.goto("/enneagram");
    await expect(
      page.getByRole("heading", { name: /Enneagram/i })
    ).toBeVisible();
  });

  test("types overview loads", async ({ page }) => {
    await page.goto("/enneagram/types");
    await expect(
      page.getByRole("heading", { name: /Nine Types/i })
    ).toBeVisible();
  });

  test("blog page loads", async ({ page }) => {
    await page.goto("/blog");
    await expect(
      page.getByRole("heading", { name: /Blog/i })
    ).toBeVisible();
  });

  test("discover page loads", async ({ page }) => {
    await page.goto("/discover");
    await expect(
      page.getByRole("heading", { name: /Find Your Way In/i })
    ).toBeVisible();
  });

  test("learn page loads", async ({ page }) => {
    await page.goto("/learn");
    await expect(
      page.getByRole("heading", { name: /Learn the Enneagram/i })
    ).toBeVisible();
  });

  test("404 page shows for unknown routes", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await expect(page.getByText(/404/i)).toBeVisible();
  });
});

test.describe("Discovery flow", () => {
  test("can start discovery", async ({ page }) => {
    await page.goto("/discover");
    await expect(page.getByRole("button", { name: /Begin/i })).toBeVisible();
  });
});
