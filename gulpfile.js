const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify");
const image = require("gulp-image");

const files = {
  scssPath: "src/scss/**/*.scss",
  jsPath: "src/js/**/*.js",
  htmlPath: "src/*.html",
  assetsPath: "src/assets/**/**"
};

function stylesTask() {
  return src(files.scssPath)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

function jsTask() {
  return src([files.jsPath])
    .pipe(concat("main.js"))
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

function htmlTask() {
  return src(files.htmlPath)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

function assetsTask() {
  return src(files.assetsPath)
    .pipe(image())
    .pipe(dest("dist/assets"))
    .pipe(browserSync.stream());
}

function watchTask() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  watch(
    [files.scssPath, files.jsPath, files.htmlPath, files.assetsPath],
    series(parallel(stylesTask, jsTask, htmlTask, assetsTask))
  );
}

exports.default = series(
  parallel(stylesTask, jsTask, htmlTask, assetsTask),
  watchTask
);
