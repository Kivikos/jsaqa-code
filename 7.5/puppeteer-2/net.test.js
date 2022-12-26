const { Browser } = require("puppeteer");
const {
  clickElement,
  putText,
  getText,
  getDays,
  getMovieTime,
  getSeatSelector,
} = require("./lib/commands.js");
const {
  bookTickets,
  selectedTickets,
  getBookingCode,
} = require("./lib/selectors");

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
    await getDays(page, 5); //выбираем дату
    await getMovieTime(page, 2, 2); //выбираем время
    await getSeatSelector(page, 1, 1); //выбираем место
    await clickElement(page, bookTickets); // нажимаем забронировать
    await page.waitForSelector(selectedTickets); //ждем загрузки страницы
    await clickElement(page, getBookingCode); //получить код бронирования
    const actual = await getText(page, selectedTickets);
    expect(actual).toContain("Электронный билет");
  });

  test("Should buy two tickets", async () => {
    await getDays(page, 5);
    await getMovieTime(page, 2, 2);
    await getSeatSelector(page, 1, 10);
    await getSeatSelector(page, 1, 9);
    await clickElement(page, bookTickets);
    await page.waitForSelector(selectedTickets);
    await clickElement(page, getBookingCode);
    const actual = await getText(page, selectedTickets);
    expect(actual).toContain("Электронный билет");
  });

  test("Should try to buy unavailable ticket", async () => {
    await getDays(page, 5);
    await getMovieTime(page, 2, 2);
    await getSeatSelector(page, 1, 1);
    expect(
      await page.$eval("button", (button) => {
        return button.disabled;
      })
    ).toBe(true);
  });
});
