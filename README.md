# lib-bundler

lib-bundler is a code bundler for bundling the js lib that it written by es6.

## Usage
```
$ npm install lib-bundler --save-dev
```

``` javascript
var Bundler = require('lib-bundler');

var bundler = new Bundler({
    project: "test",
    moduleName: "test",
    author: "author",
    version: "1.0.0",
    entry: "./src/index.js",
    output: "./dist"
});

bundler.bundled()
```

## Feedback
If you any questions, use [Issues](https://github.com/miaowing/lib-bundler/issues).

Sina Weibo: [@miaowingz](http://weibo.com/zfeng217)

## License
MIT Licence.