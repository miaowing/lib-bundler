/**
 * Created by zhaofeng on 2016/11/1.
 */
var assert = require('assert'),
    utils = require('../src/utils'),
    fs = require('fs');

describe('lib-bundler', function () {
    // test cases
    describe('#getSize(code)', function () {
        it('respond with matching records', function (done) {
            var kb = utils.getSize('code');
            assert.equal(kb, '0.00kb');
            done();
        });
    });

    describe('#blue(code)', function () {
        it('respond with matching records', function (done) {
            var kb = utils.blue('code');
            assert.equal(kb, '\x1b[1m\x1b[34mcode\x1b[39m\x1b[22m');
            done();
        });
    });

    describe('#write(dest, code)', function () {
        it('respond with matching records', function (done) {
            var path = './test/output';

            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }

            utils.write(path + '/test.js', 'code').then(function () {
                var code = fs.readFileSync(path + '/test.js');
                assert.equal(code, 'code');
                done();
            });
        });
    });

    describe('#zip(outputPath, projectPath)', function () {
        it('respond with matching records', function (done) {
            var path = './test/output';

            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }

            utils.zip(path, 'README.md').then(function () {
                assert.equal(fs.existsSync(path + '/' + 'README.md.gz'), true);
                done();
            });
        });
    });
});
