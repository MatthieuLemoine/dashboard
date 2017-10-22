import puppeteer from 'puppeteer';

export default async function getBrowser() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  return browser;
}
