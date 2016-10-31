#### Steps to Install & Run
- Install [NVM](https://github.com/creationix/nvm) to manage/install NodeJS
- `nvm install 6` to install Node 6
- `npm i -g gulp-cli` to install Gulp task runner globally or just `npm run watch`
- `gulp watch`
- `gulp build -q && gulp serve` prod like build, without uglification/minification
- `gulp build && gulp serve` prod like build, with uglification/minification

#### Tests

##### Integration Testing - Karma
```sh
$ gulp test:integration # or
$ gulp test:integration --desktop=safari # run locally in Safari
$ gulp test:integration -f sample-spec # test a single file
$ gulp karma # run tests in `ci` mode on BrowserStack => you can test mobile browsers here
```
to run on BrowserStack export config from your environment or encrypt in CI
```sh
export BROWSERSTACK_USERNAME='<username>'
export BROWSERSTACK_API='<key>'
export localIdentifier='<anything_can_go_here>'
```

##### End to End Tests - Selenium + Webdriverio
You must have Java installed on your local machine and the Java version must be greater than v6 `> 6`.
- Some useful links for Java installation [JAVA Runtime](https://support.apple.com/kb/DL1572?locale=en_US) specific for [Yosemite](http://fredericiana.com/2014/10/21/osx-yosemite-java-runtime-environment/)

To run tests on browsers other than Chrome and Firefox, and to run tests on mobile devices you must `export` [BrowserStack](https://www.browserstack.com) credentials into your shell environment. Obtain these credentials from one of your co-workers.

###### Running E2E Tests
Similar to the Integration tests, all E2E test files must be named with a `-spec.js` extension or they will not be run. There are many ways to run the End to End tests, and it is important to understand how to specify which browsers/devices you would like to run the tests on. The easiest way is to `export default` the browsers/devices the test is intended to run on:

```js
//sample-spec.js
export default {
  desktop: ['chrome', 'firefox', 'ie', 'safari'],
  mobile: ['iphone'] //TODO: be able to run on more devices other than iPhone
}
```

###### Commands
```sh
$ gulp selenium # runs all files and all devices
$ gulp selenium --desktop # runs all files and their associated desktop browsers
$ gulp selenium --desktop=chrome,firefox # runs all files specifying these browsers => will run locally
$ gulp selenium --desktop=chrome,i # runs all files specifying these browsers => will run on BrowserStack
$ gulp selenium --desktop=ie --force will run all files on "ie" even if the do not directly `export` it
# the above commands are the same for mobile
$ gulp selenium --mobile
$ gulp selenium --mobile=iphone
$ gulp selenium --mobile=iphone --force
# single spec files can also be run, you don't need to specify `--force` if the file doesn't `export` the browser/device you want to test
$ gulp selenium sample-spec
$ gulp selenium --desktop -f sample-spec
$ gulp selenium --desktop=ie -f sample-spec
# you can also just setup the BrowserStack tunnel so you can do "live" QA of browsers/devices on your local IP
$ gulp selenium:tunnel
```

##### Debugging
It's possible to run e2e tests in 4 different ways
- test local browser launchers (only Chrome and Firefox) on a local selenium server against `localhost`
```sh
gulp selenium --desktop # runs specs in `desktop` directory on Chrome and Firefox
gulp selenium --desktop=chrome,firefox
```

- test `localhost` on various browsers/devices on BrowserStack
```sh
gulp selenium:tunnel --desktop # runs specs in `desktop` directory on Chrome and Firefox
gulp selenium --desktop=chrome,firefox,safari # automatically runs on BS because Safari is not local
gulp selenium --desktop --mobile=iphone # run chrome an firefox on BS, and when complete run iPhone on specs in `mobile` directory
```
