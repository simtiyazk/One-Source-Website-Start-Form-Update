// generated on 2015-08-24 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import connect from 'gulp-connect-php';
import browserSync from 'browser-sync';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import { argv } from 'yargs';
import del from 'del';
import runSequence from 'run-sequence';
import { stream as wiredep } from 'wiredep';
import eslint from 'gulp-eslint';
import handlebarHelpers from './app/_helpers/helpers.js';
import layouts from 'handlebars-layouts';
import handlebars from 'handlebars';
import glob from 'glob';
import sassLint from 'gulp-sass-lint';
import mainBowerFiles from 'main-bower-files';
import replace from 'gulp-string-replace';
import minify from 'gulp-minify';
import rename from 'gulp-rename';

// Register helpers
handlebars.registerHelper(layouts(handlebars));

const $ = gulpLoadPlugins();
// Print stats after finishing a process
$.stats(gulp);
const reload = browserSync.reload;

gulp.task('php', () => {
  connect.server({
    base: 'backend/',
    livereload: true
  });
});

gulp.task('copy_pdf', () => {
  gulp
    .src(['./app/pdf/**/*.pdf'])
    .pipe(gulp.dest('./dist/pdf/'));
});

gulp.task('scss-lint', function() {
  return gulp
    .src('app/styles/**/*.scss')
    .pipe(
      sassLint({
        files: {
          ignore: [
            'app/styles/vendors/**/*.scss',
            'app/styles/helpers/_animations.scss'
          ]
        },
        rules: {
          'property-sort-order': 0,
          'empty-line-between-blocks': 0,
          'single-line-per-selector': 0,
          'mixin-name-format': 0,
          'brace-style': 0,
          'variable-name-format': 0,
          'space-before-brace': 0,
          'force-attribute-nesting': 0,
          'force-pseudo-nesting': 0,
          'nesting-depth': 0
        }
      })
    )
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('styles', () =>
  gulp
    .src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass
        .sync({
          outputStyle: 'expanded',
          precision: 10,
          includePaths: ['.', 'node_modules/bootstrap/']
        })
        .on('error', $.sass.logError)
    )
    .pipe($.autoprefixer({ browsers: ['last 4 versions'] }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({ stream: true }))
);

gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({ searchPath: ['.tmp', 'app', '.'] });
  return gulp
    .src('app/public/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(
      $.if(
        '*.html',
        $.htmlmin({ collapseWhitespace: false, removeComments: true })
      )
    )
    .pipe(gulp.dest('dist'));
});

gulp.task('minify', () => {
  return gulp.src('dist/styles/*.css')
    .pipe($.cleanCss({compatibility: '*'}))
    .pipe(gulp.dest('dist/styles'));
});

 gulp.task('uglify', () => {
  // return gulp.src('dist/scripts/*.js')
  //   .pipe($.uglify())
  //   .pipe(gulp.dest('dist/scripts'));
  return gulp.src('dist/scripts/main.js')
        .pipe(minify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('clean_js', function(){
  return del('dist/scripts/main.js');
});
gulp.task('clean_min_js', function(){
  return del('dist/scripts/main-min.js');
});

gulp.task('copy_min_js', () => {
  return gulp.src(['./dist/scripts/main-min.js'])
    .pipe(rename('main.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('hbs', () => {
  delete require.cache[require.resolve('./app/_data/structure.data.js')]; // clean up the cache to refresh changes in structure.data

  // clean up the cache for internal scripts to refresh changes in structure.data
  glob('./app/_pages/**/*.js', options, function(er, files) {
    for (let file of files) {
      delete require.cache[require.resolve(file)];
    }
  });

  const jsonData = require('./app/_data/structure.data.js');

  const options = {
    batch: ['./app/_partials', './app/_components', './app/_layouts'],
    helpers: handlebarHelpers
  };

  return gulp
    .src('app/_pages/**/*.hbs')
    .pipe($.compileHandlebars(jsonData, options))
    .pipe($.rename({ extname: '.html' }))
    // .pipe($.flatten())
    .pipe(gulp.dest('./app/public/'));
});

gulp.task('lint', () =>
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  gulp
    .src('app/scripts/es6/**/*.js')
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
);

var notifier = require('node-notifier');
// Standard handler
var standardHandler = err => {
  // Notification
  // var notifier = new notification();
  notifier.notify({ message: 'Error: ' + err.message });
  // Log to console
  $.util.log($.util.colors.red('Error'), err.message);
};

// Es6 browserify and babel
// enable module system
gulp.task('es6', () => {
  browserify({
    entries: './app/scripts/es6/main.js',
    debug: true
  })
    .transform(babelify)
    .on('error', standardHandler)
    .bundle()
    .on('error', standardHandler)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./app/scripts/'));
});

// Combine svg files and inject it into index.html
gulp.task('svg', () => {
  var svgs = gulp
    .src('./app/images/svg/*.svg')
    .pipe($.svgmin())
    .pipe($.svgstore({ inlineSvg: true }));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src('app/_partials/global/svgs.hbs')
    .pipe($.inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest('app/_partials/global/'));
});

gulp.task('images', () =>
  gulp
    .src('app/images/**/*')
    .pipe(
      $.if(
        $.if.isFile,
        $.cache(
          $.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{ cleanupIDs: false }]
          })
        ).on('error', err => {
          /* eslint-disable no-console */
          console.log(err);
          /* eslint-enable no-console */
          this.end();
        })
      )
    )
    .pipe(gulp.dest('dist/images'))
);

gulp.task('fonts', () => {
  return gulp
    .src(
      mainBowerFiles({
        paths: {
          bowerDirectory: 'node_modules',
          bowerJson: 'package.json',
        },
        filter: '**/*.{eot,svg,ttf,woff,woff2}'
      }).concat('app/fonts/**/*')
    )
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  // Copies dummy API response json files
  gulp
    .src(['app/scripts/es6/apis/*.json'])
    .pipe(gulp.dest('dist/scripts/es6/apis/'));

  return gulp
    .src(['app/*.*', '!app/*.html'], {
      dot: true
    })
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist', 'app/public']));

gulp.task('serve', ['env-config'], () => {
  runSequence(
    ['copy_pdf', 'es6', 'svg', 'hbs', 'lint', 'scss-lint', 'styles', 'fonts'],
    () => {
      browserSync({
        notify: false,
        port: 9000,
        server: {
          baseDir: ['.tmp', 'app/public/', 'app/'],
          routes: {
            '/bower_components': 'bower_components',
            '/node_modules': 'node_modules'
          }
        }
      });

      gulp
        .watch([
          'app/**/*.html',
          'app/scripts/**/*.js',
          'app/images/**/*',
          '.tmp/fonts/**/*'
        ])
        .on('change', reload);

      gulp.watch('app/**/*.hbs', ['hbs']);
      gulp.watch('app/_data/structure.data.js', ['hbs']);
      gulp.watch('app/_pages/**/*.js', ['hbs']);
      gulp.watch('app/images/svg/*.svg', ['svg']);
      gulp.watch('app/styles/**/*.scss', ['styles']);
      gulp.watch('app/scripts/es6/**/*.js', ['lint', 'es6']);
      gulp.watch('app/fonts/**/*', ['fonts']);
    }
  );
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('copy', () => {
  gulp
    .src(['dist/**/*', '!dist/**/*.html'])
    .pipe(
      gulp.dest('../backend/project/web/app/themes/{BE-PROJECT-NAME}/assets/')
    ); // Please update Back-End project name and path if it's necessary.
});

gulp.task('copy-public', () => {
  gulp.src(['app/public/**/']).pipe(gulp.dest('dist/'));
});

// inject bower components
gulp.task('wiredep', () => {
  gulp
    .src('app/styles/*.scss')
    .pipe(
      wiredep({
        ignorePath: /^(\.\.\/)+/
      })
    )
    .pipe(gulp.dest('app/styles'));

  gulp
    .src('app/**/*.hbs')
    .pipe(
      wiredep({
        ignorePath: /^(\.\.\/)*\.\./
      })
    )
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['clean', 'env-config'], () => {
  runSequence(
    'es6',
    'hbs',
    [
      'copy_pdf',
      'svg',
      'lint',
      'html',
      'images',
      'fonts',
      'extras',
      'copy-public'
    ],
    ['minify', 'uglify'],
    ['clean_js'],
    ['copy_min_js'],
    // ['clean_min_js'],
    ['replace_url'],
    () => gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }))
  );
});

gulp.task('replace_url', function() {
  if (argv.production) {
      let url = 'https://datacapture.hibbertgroup.com';
      let pass = 'pr0BioT#$t';
      gulp.src(['dist/scripts/main.js']) // Every file allown.
        .pipe(replace('pro_bio_test', pass))
        .pipe(gulp.dest('./dist/scripts/'));
        gulp.src(['dist/scripts/main.js']) // Every file allown.
        .pipe(replace('https://datacapture.qa.hibbertgroup.com', url))
        .pipe(gulp.dest('./dist/scripts/'));
  }
});


gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

gulp.task('env-config', () => {
  const env = argv.env || 'dev',
    src = `./appconfig/${env}.config.js`,
    dest = 'app/scripts/es6/helpers/';

  return gulp
    .src(src)
    .pipe($.rename('config.js'))
    .pipe(gulp.dest(dest));
});
