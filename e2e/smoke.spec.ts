import { test, expect } from "@playwright/test";

test.describe("Smoke tests — all public pages load", () => {
  test("home page loads with hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Enneagram Growth/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Discover your type")).toBeVisible();
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("instructor page loads", async ({ page }) => {
    await page.goto("/about/instructor");
    await expect(page.getByText("Meet Your Instructor")).toBeVisible();
  });

  test("enneagram hub loads", async ({ page }) => {
    await page.goto("/enneagram");
    await expect(page.getByRole("heading", { name: /Enneagram/i })).toBeVisible();
  });

  test("types overview loads", async ({ page }) => {
    await page.goto("/enneagram/types");
    await expect(page.getByRole("heading", { name: /Nine Types/i })).toBeVisible();
  });

  test("blog page loads", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { name: /Blog/i })).toBeVisible();
  });

  test("discover page loads", async ({ page }) => {
    await page.goto("/discover");
    await expect(page.getByRole("heading", { name: /Find Your Way In/i })).toBeVisible();
  });

  test("learn page loads", async ({ page }) => {
    await page.goto("/learn");
    await expect(page.getByRole("heading", { name: /Learn the Enneagram/i })).toBeVisible();
  });

  test("privacy page loads", async ({ page }) => {
    await page.goto("/legal/privacy");
    await expect(page.getByText("Privacy Policy")).toBeVisible();
  });

  test("terms page loads", async ({ page }) => {
    await page.goto("/legal/terms");
    await expect(page.getByText("Terms of Service")).toBeVisible();
  });

  test("404 page shows for unknown routes", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await expect(page.getByText(/404/i)).toBeVisible();
  });
});

test.describe("Type pages — all 9 types load", () => {
  const types = [
    { n: 1, name: "Reformer" },
    { n: 2, name: "Helper" },
    { n: 3, name: "Achiever" },
    { n: 4, name: "Individualist" },
    { n: 5, name: "Investigator" },
    { n: 6, name: "Loyalist" },
    { n: 7, name: "Enthusiast" },
    { n: 8, name: "Challenger" },
    { n: 9, name: "Peacemaker" },
  ];

  for (const { n, name } of types) {
    test(`Type ${n} — ${name} page loads with content`, async ({ page }) => {
      await page.goto(`/enneagram/types/${n}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByText(name)).toBeVisible();
      // Verify deep content sections exist
      await expect(page.getByText("At a Glance")).toBeVisible();
      await expect(page.getByText("Core Motivation")).toBeVisible();
    });
  }
});

test.describe("Learn section — lessons load", () => {
  const lessons = [
    "what-is-the-enneagram",
    "the-three-centers",
    "the-nine-types",
    "wings-arrows-growth",
    "finding-your-type",
    "using-it-responsibly",
    "going-deeper",
  ];

  for (const lesson of lessons) {
    test(`Lesson "${lesson}" loads`, async ({ page }) => {
      await page.goto(`/learn/${lesson}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});

test.describe("Enneagram articles load", () => {
  const articles = [
    "what-is-it",
    "centers",
    "wings",
    "arrows",
    "instincts",
    "mistyping",
    "responsible-use",
    "glossary",
  ];

  for (const article of articles) {
    test(`Article "${article}" loads`, async ({ page }) => {
      await page.goto(`/enneagram/${article}`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }
});

test.describe("Navigation", () => {
  test("header shows site name and nav links", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Enneagram Growth")).toBeVisible();
    const nav = page.locator("header nav");
    await expect(nav.getByText("Learn")).toBeVisible();
    await expect(nav.getByText("Enneagram")).toBeVisible();
    await expect(nav.getByText("Discover")).toBeVisible();
    await expect(nav.getByText("Blog")).toBeVisible();
  });

  test("footer has explore and about sections", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByText("The Nine Types")).toBeVisible();
    await expect(footer.getByText("Privacy Policy")).toBeVisible();
  });

  test("clicking Learn nav link navigates to /learn", async ({ page }) => {
    await page.goto("/");
    await page.locator("header nav").getByText("Learn").click();
    await expect(page).toHaveURL(/\/learn/);
    await expect(page.getByRole("heading", { name: /Learn/i })).toBeVisible();
  });
});

test.describe("Discovery flow", () => {
  test("can start discovery and see first question", async ({ page }) => {
    await page.goto("/discover");
    await expect(page.getByRole("button", { name: /Begin/i })).toBeVisible();
    await page.getByRole("button", { name: /Begin/i }).click();
    // Should show first question
    await expect(page.getByText(/stress/i)).toBeVisible();
  });
});

test.describe("Responsive design", () => {
  test("mobile nav hamburger appears on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expect(page.getByRole("button", { name: /Toggle menu/i })).toBeVisible();
    // Desktop nav should be hidden
    await expect(page.locator("header nav")).toBeHidden();
  });

  test("desktop nav is visible on large screens", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    await expect(page.locator("header nav")).toBeVisible();
  });

  test("type page is readable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/enneagram/types/1");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Reformer")).toBeVisible();
  });

  test("home page hero renders on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Discover your type")).toBeVisible();
  });
});

test.describe("SEO basics", () => {
  test("home page has meta description", async ({ page }) => {
    await page.goto("/");
    const desc = page.locator('meta[name="description"]');
    await expect(desc).toHaveAttribute("content", /.+/);
  });

  test("type page has correct title", async ({ page }) => {
    await page.goto("/enneagram/types/5");
    await expect(page).toHaveTitle(/Type 5/);
    await expect(page).toHaveTitle(/Investigator/);
  });

  test("learn page has correct title", async ({ page }) => {
    await page.goto("/learn");
    await expect(page).toHaveTitle(/Learn/i);
  });
});
