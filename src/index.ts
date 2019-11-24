import { performance } from 'perf_hooks';
import puppeteer from 'puppeteer';
import {
  extractData,
  generatePDF,
  generateSnapshot,
  writeJsonFile,
} from './actions.js';

// Website url to scrape data from
const URL = 'https://scrapethissite.com/pages/forms/';

(async () => {
  const t0 = performance.now();
  // First create a new browser instance
  const browser = await puppeteer.launch();
  // ... and a blank page inside
  const page = await browser.newPage();
  try {
    // ... then fill it with scraping source data from a website
    await page.goto(URL);
    const t1 = performance.now();
    console.log(
      'Data collected !\n',
      `Data scraping took ${Math.floor(t1 - t0)} ms.`,
    );

    const t2 = performance.now();
    // execute tasks in parallel,
    // and force wait for all done before closing browser.
    await Promise.all([
      generateSnapshot(page),
      generatePDF(page),
      extractData(page).then(writeJsonFile),
    ]);
    const t3 = performance.now();
    console.log(`Tasks execution took ${Math.floor(t3 - t2)} ms.`);
  } catch (error) {
    console.error(error);
  } finally {
    // close headless browser once all done.
    browser.close();
  }
})();
