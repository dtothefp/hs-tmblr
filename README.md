#### Steps to Install & Run
- Install [NVM](https://github.com/creationix/nvm) to manage/install NodeJS
- `nvm install 6` to install Node 6
- `npm i -g gulp-cli` to install Gulp task runner globally or just `npm run watch`
- `npm i -g yarn` to install yarn
- `yarn` install all dependencies
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
