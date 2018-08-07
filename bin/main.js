#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package.json');
var convertBRL = require('./convertBRL');

program.version(pkg.version).description('Convert Brazilian Currency to Canadian Currency').option('-C, --currency <currency>', 'currency to be converted <not implemented yet> (default: BRL)').option('-A, --amount <amount>', 'Value in BRL to convert (default: 1)').parse(process.argv);

convertBRL(program.currency, program.amount);