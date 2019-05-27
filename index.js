const puppeteer = require('puppeteer');
const comparer = require("./screenShotComparer");

(async () => {
  const browser = await puppeteer.launch(
    {
      defaultViewport: {
        height: 1080,
        width: 1920
      }
    });


	console.log("hello");
  const page = await browser.newPage();
  await page.goto('https://github.com');

  const refereceFileName = "reference.png";
  await page.screenshot({ path: refereceFileName, fullPage: true });

  await page.evaluate(function () {
    const body = document.getElementsByTagName("body")[0];
    body.setAttribute("style", "background-color:red;");
    console.log("Hello from the browser");
  });

  const regressionFileName = "regression.png";
  await page.screenshot({ path: regressionFileName, fullPage: true });

  comparer.cmpImages(refereceFileName, regressionFileName);

  await browser.close();
})();