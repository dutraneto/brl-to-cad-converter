const expect = require('chai').expect;

const exec = require('child_process').exec; // to run in a terminal
const brlConverter = './src/main.js';
const pkg = require('../package.json');

describe('Main CLI', () => {
    it('should return version of brlConverter', (done) => {
        exec(`${brlConverter} --version`, (err, stdout, stderr) => {
            if (err) throw err;
            expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
            done();
        });
    });

    it('should return the description when brlConverter --help', (done) => {
        exec(`${brlConverter} --help`, (err, stdout, stderr) => {
            if (err) throw err;
            expect(stdout.includes('Convert Brazilian Currency to Canadian Currency')).to.be.true;
            done();
        });
    });

    it('should return the currency option when brlConverter --help', (done) => {
        exec(`${brlConverter} --help`, (err, stdout, stderr) => {
            if (err) throw err;
            expect(stdout.includes('--currency')).to.be.true;
            done();
        });
    });

    it('should return the amount option when brlConverter --help', (done) => {
        exec(`${brlConverter} --help`, (err, stdout, stderr) => {
            if (err) throw err;
            expect(stdout.includes('--amount')).to.be.true;
            done();
        });
    });
});
