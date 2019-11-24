# Web Scraping Example

A basic example demonstrating web scraping data from a website, using Puppeteer.

## Features

This repository is forked from [CodeDraken](https://github.com/CodeDraken/puppeteer-example), and modernized with Typescript and ES8.

This code snippet should ideally be integrated within a Node10 server.
It consists essentially in 2 files :

- `actions.ts`: implementation details for the scraping function (`page.evaluate`), and functions exploiting the collected data.
- `index.ts`: main routine consuming above actions, asynchronously (`async/await`).

Scraped data is exploited as :

- json object in console
- json file
- pdf file
- screenshot image

## Usage

Clone this repository, run `yarn` to install dependencies, then have fun with :

```sh
yarn start
```

Note: you can use with `npm`.

## More examples

[Book prices from library](https://www.smooth-code.com/articles/scraper-le-web-avec-puppeteer)

[How to login to a website(Linkedin) ?](https://browsee.io/blog/web-scraper-using-puppeteer-how-to-login-to-a-website#q2howtologintolinkedin)

[Extract emails from Github](https://medium.com/@e_mad_ehsan/getting-started-with-puppeteer-and-chrome-headless-for-web-scrapping-6bf5979dee3e)
