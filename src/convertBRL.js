const request = require('request');
const chalk = require('chalk');
const ora = require('ora');

const spinner = ora({
    text: 'Retrieving BRL data...',
    color: 'red',
});


function convertBRL(currency='BRL', amount=1) {
    // return `${amount} ${currency} to CAD = 0.40`;
    const url = `https://free.currencyconverterapi.com/api/v6/convert?q=${currency}_CAD`;

    spinner.start();
    request(url, (error, response, body) => {
        let apiResponse;
        // console.log(`10 BRL to CAD = ${apiResponse.price}`);
        spinner.stop();

        try {
            apiResponse = JSON.parse(body);

        } catch (parseError) {
            console.log("Something went wrong in the API");
            console.log(apiResponse);
            return parseError;
        }
        console.log(`${chalk.red.bold(amount)} ${chalk.cyan(currency)} to ${chalk.cyan('CAD')} = ${chalk.green.bold(apiResponse.results.BRL_CAD.val * amount)}`);
    });
}

module.exports = convertBRL;
