const http = require("http");
const puppeteer = require("puppeteer");

const f = () => {
  console.log("3:", v);
  global.v = 10;
};

const test = function (req, res) {
  global.v = new Date().toLocaleDateString();
  (async () => {
    console.log("2:", v);
    f();
    console.log("4:", v);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://ru.wikipedia.org/wiki/%D0%92%D0%B8%D0%BA%D0%B8");
    await page.waitForTimeout(10000);
    await browser.close();
    console.log("close");
  })();
};

http
  .createServer((req, res) => {
    console.log("1:", v);
    test(req, res);
    res.end();
  })
  .listen(8084);
console.log("Listen to port 8084");
