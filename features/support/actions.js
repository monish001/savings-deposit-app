// Dependencies
const assert = require('assert');
const SavingDeposit = require('../../server/models/saving-deposit.model');
const User = require('../../server/models/user.model');
// const { validUsers, validUser } = require('api/test/data/userData.test');
// const { interactsWithMail } = require('api/test/helpers/emailStub');
const pages = require('./pages');
const selectors = require('./selectors');
const scope = require('./scope');

// Defines whether puppeteer runs Chrome in headless mode.
let headless = false;
let slowMo = 15;

// Chrome is set to run headlessly and with no slowdown in CircleCI
if (process.env.CIRCLECI) headless = true;
if (process.env.CIRCLECI) slowMo = 0;


const userExists = async () => {
    scope.context.user = {
        email: 'saving.deposits.app+11@gmail.com',
        password: 'qwerty',
    }
};

const pending = callback => {
	callback(null, 'pending');
};

const visitHomePage = async () => {
	if (!scope.browser)
		scope.browser = await scope.driver.launch({ headless, slowMo });
	scope.context.currentPage = await scope.browser.newPage();
	scope.context.currentPage.setViewport({ width: 1280, height: 1024 });
	const url = scope.host + pages.home.url;
	const visit = await scope.context.currentPage.goto(url, {
		waitUntil: 'networkidle2'
	});
	return visit;
};

const fillInFormField = async (fieldName, textToFill) => {
    const page = scope.context.currentPage;
    const selector = selectors.logInForm.fields[fieldName];
    await page.waitForSelector(selector);
    await page.type(selector, textToFill);
};

const pressButton = async (buttonTitle) => {
    const selector = selectors.logInForm.buttons[buttonTitle];
    console.log('pressButton', 'buttonTitle', buttonTitle);
    console.log('pressButton', 'selector', selector);
    const page = scope.context.currentPage;
    await page.click(selector);
}

const shouldBeOnPage = async (pageTitle) => {
    const page = scope.context.currentPage;
    await page.waitForNavigation({waitUntil: 'networkidle0'});
    const expectedPageTitle = pages[pageTitle].title;
    // await page.waitForSelector(selector);
    const actualPageTitle = await page.evaluate(() => document.querySelector('h3').textContent);
    assert.equal(actualPageTitle, expectedPageTitle, `Page title mismatch! Actual: ${actualPageTitle}. Expected: ${expectedPageTitle}`);
}

module.exports = {
    userExists,
    visitHomePage,
    fillInFormField,
    pressButton,
    shouldBeOnPage,
    pending,
};