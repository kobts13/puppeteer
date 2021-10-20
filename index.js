const puppeteer = require("puppeteer");
process.env.NODE_ENV = "staging";
const configProvider = require("./provider");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8");
  await page.screenshot({ path: "wiki.png" });

  await browser.close();
})();

console.log(configProvider.get("general.system.input.type"));
console.log(configProvider.get("env.token"));
console.log(configProvider.get("config.config.color"));
