/**
 * Created by zhaofeng on 2016/11/1.
 */
var assert = require('assert'),
    Bundler = require('../src/index'),
    fs = require('fs');

describe('lib-bundler', function () {
    // test cases
    describe('#bundled(options)', function () {
        it('respond with matching records', function (done) {
            this.timeout(10000);

            if (!fs.existsSync('./test/output')) {
                fs.mkdirSync('./test/output');
            }

            var bundler = new Bundler({
                project: "test",
                moduleName: "test",
                author: "testAuthor",
                version: "1.0.0",
                entry: "./test/files/index.js",
                output: "./test/output"
            });

            bundler.bundled().then(function () {
                var path = './test/output';
                try {
                    assert.equal(fs.existsSync(path + '/' + 'test.common.js'), true);
                    assert.equal(fs.existsSync(path + '/' + 'test.min.js'), true);
                    assert.equal(fs.existsSync(path + '/' + 'test.min.js.gz'), true);
                    assert.equal(fs.existsSync(path + '/' + 'test.min.js.map'), true);
                } catch(e) {
                    console.log(e);
                }

                done();
            }, console.log);
        });
    });
});
