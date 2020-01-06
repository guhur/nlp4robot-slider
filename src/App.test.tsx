import React from 'react';
import { render } from '@testing-library/react';
import puppeteer from 'puppeteer';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  //  const linkElement = getByText(/learn react/i);
  //  expect(linkElement).toBeInTheDocument();
});

test('it can load a sample', async () => {
	let browser = await puppeteer.launch({
		headless: false
	});
	let page = await browser.newPage();

	await page.goto("http://localhost:3000/");
	await page.waitForSelector("#name");
	await page.click("#name");
	await page.type("#name", "test");
	await page.click("#submit");

	await page.waitFor(4000);

	browser.close();

}, 9000);
