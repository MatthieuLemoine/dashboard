import scrapeIt from 'scrape-it';
import isToday from 'date-fns/is_today';
import db from '../db';

const URL = 'https://www.google.fr/search?q=equipe+de+france+calendrier';

let browser;

export async function init(puppeteerBrowser) {
  browser = puppeteerBrowser;
}

export async function getScheduleAndResults() {
  const lastFetch = db.get('football.lastFetch').value();
  if (lastFetch && isToday(new Date(lastFetch))) {
    return db.get('football.schedule').value() || [];
  }
  const schedule = await scrapShedule();
  await storeSchedule(schedule);
  return schedule;
}

async function scrapShedule() {
  const page = await browser.newPage();
  await page.goto(URL);
  const html = await page.content();
  const schedule = {
    matchs: [...getHiddenMatches(html), ...getMatches(html)],
  };
  if (!schedule.matchs.length) {
    throw new Error('Empty schedule. Try again.');
  }
  await page.close();
  return schedule;
}

async function storeSchedule(schedule) {
  db.set('football.lastFetch', new Date()).write();
  db.set('football.schedule', schedule).write();
}

function getHiddenMatches(html) {
  return scrapeIt
    .scrapeHTML(html, {
      matchs: {
        listItem: 'tbody > tr',
        data: {
          info: 'td._Xc.vk_pl > div > div > div',
          result: 'td > div.xpdxpnd > div._CLh',
          time: 'td > div.xpdxpnd > div > div._Zdb > span.vk_gy',
          teams: {
            listItem: 'td > div.xpdxpnd',
            data: {
              picture: {
                selector: 'div > img',
                attr: 'src',
              },
              name: 'div',
            },
          },
        },
      },
    })
    .matchs.filter(match => !!match.info)
    .map(match => ({
      ...match,
      teams: match.teams.filter(team => !!team.picture).map(team => ({
        ...team,
        name: team.name
          .split(match.info)
          .join('')
          .split(match.time)
          .join(''),
        picture: `https:${team.picture}`,
      })),
    }));
}

function getMatches(html) {
  return scrapeIt
    .scrapeHTML(html, {
      matchs: {
        listItem: 'tbody:nth-child(3) > tr',
        data: {
          info: 'td._Xc.vk_pl > div > div',
          result: 'td > div._CLh',
          time: 'td > div > div._Zdb > span.vk_gy',
          teams: {
            listItem: 'td',
            data: {
              picture: {
                selector: 'div > img',
                attr: 'src',
              },
              name: 'div',
            },
          },
        },
      },
    })
    .matchs.filter(match => !!match.info)
    .map(match => ({
      ...match,
      teams: match.teams.filter(team => !!team.picture).map(team => ({
        ...team,
        name: team.name
          .split(match.info)
          .join('')
          .split(match.time)
          .join(''),
      })),
    }));
}
