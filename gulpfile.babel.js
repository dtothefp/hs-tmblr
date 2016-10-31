import 'babel-polyfill';
import gulp from 'gulp';
import build from 'boiler-core';

const {tasks, config, plugins} = build(gulp);
const {browserSync} = plugins;
const {sources, utils, environment} = config;
const {isDev} = environment;
const {testDir, buildDir} = sources;
const {addbase} = utils;

gulp.task('assemble', tasks.assemble);
gulp.task('browser-sync', tasks.browserSync);
gulp.task('clean', tasks.clean);
gulp.task('copy', tasks.copy);
gulp.task('karma', tasks.karma);
gulp.task('json-server', tasks.jsonServer);
gulp.task('lint:test', tasks.eslint);
gulp.task('lint:build', tasks.eslint);
gulp.task('lint', gulp.parallel('lint:test', 'lint:build'));
gulp.task('selenium', tasks.selenium);
gulp.task('selenium:tunnel', tasks.selenium);
gulp.task('webpack:global', tasks.webpack);
gulp.task('webpack:main', tasks.webpack);
gulp.task('webpack', gulp.parallel('webpack:global', 'webpack:main'));

gulp.task('serve', gulp.parallel('json-server', 'browser-sync'));

gulp.task('build', (cb) => {
  let task;

  if (isDev) {
    //gulp watch
    task = gulp.series(
      'clean',
      'lint',
      'webpack',
      'assemble',
      'serve'
    );
  } else {
    task = gulp.series(
      'clean',
      'lint',
      'webpack',
      'assemble'
    );
  }

  return task(cb);
});

gulp.task('watch:build', () => {
  gulp.watch(
    addbase(buildDir, '{js,css}/**/*.{js,css}')
  ).on('change', browserSync.reload);

  gulp.watch([
    addbase(testDir, '**/*.js'),
    addbase('gulp', '**/*.js')
  ]).on('change', gulp.series('lint'));
});

gulp.task('default', gulp.series('build'));
gulp.task('test:integration', gulp.series('lint', 'karma'));
gulp.task('watch', gulp.series('build', 'watch:build'));
