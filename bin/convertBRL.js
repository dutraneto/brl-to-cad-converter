'use strict';

var request = require('request');
var chalk = require('chalk');
var ora = require('ora');

var spinner = ora({
    text: 'Retrieving BRL data...',
    color: 'red'
});

function convertBRL() {
    var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'BRL';
    var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    // return `${amount} ${currency} to CAD = 0.40`;
    var url = 'https://free.currencyconverterapi.com/api/v6/convert?q=' + currency + '_CAD';

    spinner.start();
    request(url, function (error, response, body) {
        var apiResponse = void 0;
        // console.log(`10 BRL to CAD = ${apiResponse.price}`);
        spinner.stop();

        try {
            apiResponse = JSON.parse(body);
        } catch (parseError) {
            console.log("Something went wrong in the API");
            console.log(apiResponse);
            return parseError;
        }
        console.log(chalk.red.bold(amount) + ' ' + chalk.cyan(currency) + ' to ' + chalk.cyan('CAD') + ' = ' + chalk.green.bold(apiResponse.results.BRL_CAD.val * amount));
    });
}

module.exports = convertBRL;