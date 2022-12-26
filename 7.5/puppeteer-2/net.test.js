const { Browser } = require("puppeteer");
const { clickElement, putText, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Ticket buying tests", () => {
  test("Should buy available ticket", async () => {
    await clickElement(page, "body > nav > a:nth-child(5)");
    await clickElement(page, "div:nth-child(2) > ul > li > a");
    await clickElement(page, "div:nth-child(1) > span:nth-child(1)");
    await clickElement(page, "body > main > section > button");
    await page.waitForSelector("body > main > section > header > h2");
    await clickElement(page, "body > main > section > div > button");
    const actual = await getText(page, "body > main > section > header > h2");
    expect(actual).toContain("Электронный билет");
  });

  test("Tickets should be booked", async () => {
    await clickElement(page, "body > nav > a:nth-child(5)");
    await clickElement(page, "div:nth-child(2) > ul > li > a");
    await clickElement(page, "div:nth-child(1) > span:nth-child(10)");
    await clickElement(page, "div:nth-child(1) > span:nth-child(9)");
    await clickElement(page, "body > main > section > button");
    await page.waitForSelector("body > main > section > header > h2");
    await clickElement(page, "body > main > section > div > button");
    const actual = await getText(page, "body > main > section > header > h2");
    expect(actual).toContain("Электронный билет");
  });

  test("Should try to buy unavailable ticket", async () => {
    await clickElement(page, "body > nav > a:nth-child(5)");
    await clickElement(page, "div:nth-child(2) > ul > li > a");
    await clickElement(page, "div:nth-child(1) > span:nth-child(1)");
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
  });
});
