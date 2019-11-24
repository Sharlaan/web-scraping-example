import { Page } from 'puppeteer';

type PertinentData = Record<
  'name' | 'year' | 'wins' | 'losses',
  string | undefined
>;

enum CONSTANTS {
  JSON_FOLDER = './json/teams.json',
  PDF_FOLDER = './pdfs/page1.pdf',
  SCREENSHOTS_FOLDER = './screenshots/page1.png',
}

/**
 * Format a JSON object nicely.
 */
// const formatJson = (data: PertinentData[]) => JSON.stringify(data, null, 2);

/**
 * Take a screenshot and save it in
 * this folder /screenshots/page1.png
 */
export function generateSnapshot(scrapedData: Page) {
  return Promise.resolve(
    scrapedData.screenshot({ path: CONSTANTS.SCREENSHOTS_FOLDER }),
  );
}

/**
 * Generate a pdf describing the page and
 * save in this folder /pdfs/page1.pdf
 */
export function generatePDF(scrapedData: Page) {
  return Promise.resolve(scrapedData.pdf({ path: CONSTANTS.PDF_FOLDER }));
}

/**
 * Return a JSON object containing the page's data.
 */
export function extractData(scrapedData: Page) {
  return Promise.resolve(
    scrapedData.evaluate(() => {
      // a helper function for some slight code reuse
      // grab the TD, the text and remove trailing whitespace
      const grabFromRow = (row: Element, classname: string) =>
        row?.querySelector(`td.${classname}`)?.textContent?.trim();

      // get all team rows
      const teamRows: NodeListOf<HTMLTableRowElement> = document.querySelectorAll(
        'tr.team',
      );

      // we'll store our data in an array of objects,
      // obtained from looping over each team row, creating objects
      const data: PertinentData[] = Array.from(teamRows).map(tr => ({
        name: grabFromRow(tr, 'name'),
        year: grabFromRow(tr, 'year'),
        wins: grabFromRow(tr, 'wins'),
        losses: grabFromRow(tr, 'losses'),
      }));

      // console.log(formatJson(data));
      console.log(JSON.stringify(data, null, 2));

      return data;
    }),
  );
}

/**
 * Generate a *.json file containing inputted data
 * and save it in this folder /json/teams.json
 */
export function writeJsonFile(data: PertinentData[]) {
  const { writeFile } = require('fs'); // eslint-disable-line @typescript-eslint/no-var-requires
  const errorHandler: OnErrorEventHandler = error =>
    error
      ? console.error('Failed to write data !', error)
      : console.log('Data written !');
  // writeFile(CONSTANTS.JSON_FOLDER, formatJson(data), errorHandler);
  writeFile(CONSTANTS.JSON_FOLDER, JSON.stringify(data, null, 2), errorHandler);
}
