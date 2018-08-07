const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chalk = require('chalk');

const expect = chai.expect;

chai.use(sinonChai);

const convertBRL = require('../src/convertBRL');

describe('ConvertBRL', () => {
    // it('should return BRL as currency and 1 as amount default', () => {
    //     expect(convertBRL()).to.be.equal('1 BRL to CAD = 0.40');
    // });

    // it('should return BRL as currency and 1 as amount default', () => {
    //     expect(convertBRL('BRL', 10)).to.be.equal('10 BRL to CAD = 0.40');
    // });

    let consoleStub;

    const responseMock = {
        "success": true,
        "time": "2018-08-02 22:01:29",
        "results": {
            "BRL_CAD": {
                "val": 2.875034
            }
        }
    }

    beforeEach(() => {
        consoleStub = sinon.stub(console, 'log');
    });

    afterEach(() => {
        console.log.restore();
    });

    it('should use currency BRL and 1 as amount default', (done) => {
        // https://free.currencyconverterapi.com/api/v6/convert?q=BRL_CAD&compact=n
        nock('https://free.currencyconverterapi.com')
            .get('/api/v6/convert?q=BRL_CAD')
            .reply(200, responseMock);

        convertBRL('BRL', 1);

        setTimeout(() => {
            expect(consoleStub).to.have.been.calledWith(`${chalk.red.bold(1)} ${chalk.cyan('BRL')} to ${chalk.cyan('CAD')} = ${chalk.green.bold(2.875034)}`);
            done();
        }, 300);
    });
});
