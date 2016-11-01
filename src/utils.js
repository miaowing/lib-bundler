/**
 * Created by zhaofeng on 2016/11/1.
 */
var fs = require('fs');
var zlib = require('zlib');

exports.blue = function (str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
};

exports.getSize = function (code) {
    return (code.length / 1024).toFixed(2) + 'kb';
};

exports.write = function (dest, code) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(dest, code, function (err) {
            if (err) return reject(err);
            console.log(exports.blue(dest) + ' ' + exports.getSize(code));
            resolve()
        })
    })
};

exports.zip = function (outputPath, fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(outputPath + '/' + fileName, function (err, buf) {
            if (err) return reject(err);
            zlib.gzip(buf, function (err, buf) {
                if (err) return reject(err);
                exports.write(outputPath + '/' + fileName + '.gz', buf).then(resolve)
            })
        })
    })
};

exports.logError = function (e) {
    console.log(e);
};