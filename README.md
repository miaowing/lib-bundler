# lib-bundler

lib-bundler is a bundling tool for js lib implemented by es6.

## Usage
```
$ npm install lib-bundler --save-dev
```
### build.js
``` javascript
var Bundler = require('lib-bundler');

var bundler = new Bundler({
    type: "commonjs" // all, commonjs, umd; default is 'all'.
    project: "test",
    moduleName: "test",
    author: "author",
    version: "1.0.0",
    entry: "./src/index.js",
    output: "./dist",
    license: "MIT"
});

bundler.bundled()
```

### .babelrc
```json
{
  "presets": [ "es2015-rollup" ]
}
```

### Bundled
```
$ node build.js
```

### Output
```
test.common.js
test.js
test.min.js
test.min.js.gz
test.min.js.map
```

## Feedback
If you any questions, use [Issues](https://github.com/miaowing/lib-bundler/issues).

Sina Weibo: [@miaowingz](http://weibo.com/zfeng217)

## License
MIT Licence.
