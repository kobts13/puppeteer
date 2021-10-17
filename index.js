const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8");
  await page.screenshot({ path: "wiki.png" });

  await browser.close();
})();
