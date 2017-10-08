const scrapeIt = require('scrape-it');
const puppeteer = require('puppeteer');

const URL = 'https://www.google.fr/search?q=';

let browser;

module.exports = {
  init,
  getCinemas,
};

async function init() {
  browser = await puppeteer.launch();
}

async function getCinemas(names) {
  const cinemas = await Promise.all(names.map(getShowtimes));
  return cinemas;
}

async function getShowtimes(cinema) {
  const page = await browser.newPage();
  await page.goto(`${URL}${cinema}`);
  const html = await page.content();
  const data = scrapeIt.scrapeHTML(html, {
    movies: {
      listItem: '.tb_stc .lr_c_fcb',
      data: {
        title: '.lr_c_tmt a',
        showtimes: {
          listItem: '.lr_c_s .lr_c_fce a',
        },
      },
    },
  });
  return {
    name: cinema,
    ...data,
  };
}
