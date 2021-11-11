const puppeteer = require("puppeteer");
process.env.NODE_ENV = "production1";
const configProvider = require("./provider");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(configProvider.get("env.url"));
  await page.screenshot({ path: "wiki.png" });

  await browser.close();
})();

// console.log(configProvider.get("general.system.input.type"));
// console.log(configProvider.get("env.token"));
// console.log(configProvider.get("config.color"));
// console.log(configProvider.get("env.property"));
// console.log(configProvider.get("env.test1.test2.test3"));
