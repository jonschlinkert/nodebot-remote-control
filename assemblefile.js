'use strict';

var del = require('delete');
var assemble = require('assemble');
var app = assemble();

app.task('default', ['del', 'copy'], function() {
  app.layouts('src/templates/layouts/*.hbs');
  app.pages('src/templates/pages/*.hbs');
  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(app.dest(function(file) {
      file.extname = '.html';
      return 'dist';
    }));
});

app.task('copy', function() {
  return app.src('src/assets/**')
    .pipe(app.dest('dist/assets/'));
});

app.task('del', function(cb) {
  del('dist', cb);
});

module.exports = app;
