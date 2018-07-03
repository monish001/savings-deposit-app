const { Given, When, Then } = require('cucumber');
const scope = require('../support/scope');
const {userExists, visitHomePage, fillInFormField, pressButton, shouldBeOnPage} = require('../support/actions');

Given('I am an email registered regular user', async () => {
    await userExists();
});
When('I login', {timeout: 60 * 1000}, async () => {
    await visitHomePage();
    await fillInFormField('Email', scope.context.user.email);
    await fillInFormField('Password', scope.context.user.password);
    await pressButton('Sign In');
});

Then('I must see saving deposits page', async () => {
    return await shouldBeOnPage('Saving deposits');
});
