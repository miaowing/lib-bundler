/**
 * Created by zhaofeng on 2016/11/1.
 */
var fs = require('fs');
var rollup = require("rollup");
var replace = require('rollup-plugin-replace');
var babel = require('rollup-plugin-babel');
var utils = require('./utils');
var uglify = require('uglify-js');

exports.bundler = function (options) {
    var exports = {};
    options = options || {};

    var projectName = options.project || "lib_bundler_project";
    var moduleName = options.moduleName || "lib_bundler_module";
    var authorName = options.author || "lib_builder";
    var version = options.version || "0.0.1";
    var entry = options.entry || "./index.js";
    var output = options.output || "./dist";
    var license = options.license || "MIT";


    var banner =
        '/*!\n' +
        ' * ' + projectName + ' v' + version + '\n' +
        ' * (c) ' + new Date().getFullYear() + ' ' + authorName + '\n' +
        ' * Released under the ' + license + ' License.\n' +
        ' */';

    exports.bundled = function () {
        return bundledCommonJs().then(bundledUmd).then(bundledUmdMin);
    };

    function bundledCommonJs() {
        return rollup.rollup({
            entry: entry,
            plugins: [
                babel({
                    exclude: 'node_modules/**'
                })
            ]
        }).then(function (bundle) {
            return utils.write(output + '/' + projectName + '.common.js', bundle.generate({
                format: 'cjs',
                banner: banner
            }).code)
        }).catch(utils.logError);
    }

    function bundledUmd() {
        return rollup.rollup({
            entry: entry,
            plugins: [
                replace({
                    'process.env.NODE_ENV': "'development'"
                }),
                babel({
                    exclude: 'node_modules/**'
                })
            ]
        }).then(function (bundle) {
            return utils.write(output + '/' + projectName + '.js', bundle.generate({
                format: 'umd',
                banner: banner,
                moduleName: moduleName
            }).code)
        }).catch(utils.logError);
    }

    function bundledUmdMin() {
        return rollup.rollup({
            entry: entry,
            plugins: [
                replace({
                    'process.env.NODE_ENV': "'production'"
                }),
                babel({
                    exclude: 'node_modules/**'
                })
            ]
        }).then(function (bundle) {
            var code = bundle.generate({
                format: 'umd',
                moduleName: moduleName,
                banner: banner
            }).code;

            var res = uglify.minify(code, {
                fromString: true,
                outSourceMap: projectName + '.min.js.map',
                output: {
                    preamble: banner,
                    ascii_only: true
                }
            });

            // fix uglifyjs sourcemap
            var map = JSON.parse(res.map);
            map.sources = [projectName + '.js'];
            map.sourcesContent = [code];
            map.file = projectName + '.min.js';

            return [
                utils.write(output + '/' + projectName + '.min.js', res.code),
                utils.write(output + '/' + projectName + '.min.js.map', JSON.stringify(map))
            ]
        }).then(function () {
            return utils.zip(output, projectName + '.min.js');
        }).catch(utils.logError);
    }


    return exports;
};