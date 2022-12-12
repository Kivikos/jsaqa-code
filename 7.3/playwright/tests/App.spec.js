const { test, expect } = require("@playwright/test");
import { config } from "../playwright.config.js";
import { email, password } from "../user.js";

// test.use({ headless: true });

test("Good Login", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  (await page.$('input[name = "email"]')).fill(email);
  (await page.$('input[name = "password"]')).fill(password);
  await page.screenshot({
    path: "./screenshots/Login_Page.png",
  });
  await page.click("text=Войти");
  await expect(page.locator("h2")).toHaveText("Мои курсы и профессии");
  await page.screenshot({
    path: "./screenshots/Profile_Page.png",
  });
  await page.close();
});

test("Bad Login", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  (await page.$('input[name = "email"]')).fill("bad@email.com");
  (await page.$('input[name = "password"]')).fill("asgas");
  await page.screenshot({
    path: "./screenshots/Login_Page_When_Bad_Data.png",
  });
  await page.click("text=Войти");
  let status = expect(
    page.locator("Вы ввели неправильно логин или пароль")
  ).toBeVisible;
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: "./screenshots/Login_Error.png",
  });
  await page.close();
});
