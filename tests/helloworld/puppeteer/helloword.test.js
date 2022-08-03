const puppeteer = require('puppeteer');

test('adds 1 + 2 to equal 3', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
});
