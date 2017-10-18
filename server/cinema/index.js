import scrapeIt from 'scrape-it';
import puppeteer from 'puppeteer';
import isToday from 'date-fns/is_today';
import uuid from 'uuid/v4';
import db from '../db';

const URL = 'https://www.google.fr/search?q=';

let browser;

export async function init() {
  browser = await puppeteer.launch();
}

export async function getCinemas() {
  const lastFetch = db.get('cinema.lastFetch').value();
  const cinemas = db.get('cinema.cinemas').value() || [];
  if (lastFetch && isToday(new Date(lastFetch))) {
    return cinemas;
  }
  const showtimes = await Promise.all(cinemas.map(scrapShowtimes));
  await storeShowtimes(showtimes);
  return showtimes;
}

export async function addCinema(name) {
  const match = db
    .get('cinema.cinemas')
    .find({ name })
    .value();
  if (match) {
    return match;
  }
  const cinema = await scrapShowtimes({ name });
  cinema.id = uuid();
  db
    .get('cinema.cinemas')
    .push(cinema)
    .write();
  return cinema;
}

export function removeCinema(id) {
  db
    .get('cinema.cinemas')
    .remove({ id })
    .write();
}

async function scrapShowtimes(cinema) {
  const page = await browser.newPage();
  await page.goto(`${URL}${cinema.name}`);
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
  await page.close();
  return {
    ...cinema,
    ...data,
  };
}

async function storeShowtimes(showtimes) {
  db.set('cinema.lastFetch', new Date()).write();
  db.set('cinema.cinemas', showtimes).write();
}
