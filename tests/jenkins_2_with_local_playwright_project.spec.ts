import { test, expect } from "@playwright/test";

test("Practice Test 4 @UAT", async ({ page }) => {
  console.log("Starting Practice Test 4");
  await page.goto("https://www.google.com/");
  console.log(await page.title());
  expect(page).toHaveTitle("Google");
  console.log("Ending Practice Test 4");
  //this line is added for testing purpose
});

test("Practice Test 5 @DEV", async ({ page }) => {
  console.log("Starting Practice Test 5");
  await page.goto("https://www.google.com/");
  console.log(await page.title());
  expect(page).toHaveTitle("Google");
  console.log("Ending Practice Test 5");
  //Failed test
});

test("Practice Test 6 @SIT", async ({ page }) => {
  console.log("Starting Practice Test 6");
  await page.goto("https://www.google.com/");
  console.log(await page.title());
  expect(page).toHaveTitle("Google");
  console.log("Ending Practice Test 6");
});
