const gulp = require('gulp');

/**
 * Server
 */

const browserSync = require('browser-sync').create();

/**
 * Css
 */

const Comb = require('csscomb');
var comb = new Comb('csscomb');
//comb.processPath('./App/style');

/**
 * JS
 */

const babel = require('gulp-babel');

gulp.task("babel", () => {
    gulp.src("App.js").pipe(babel({
        presets: ['@babel/preset-env']
    })).pipe(gulp.dest("dist"))
});

gulp.task("browser-sync", () => {
    browserSync.init(["./App/style/", "App.js"], {
        server: {
            baseDir: "./"
        }
    });
});

/*gulp.task("default", ["browser-sync", "css"], () => {
    gulp.watch("*.html").on("change", browserSync.reload);
    gulp.watch(["./App/style/*.css", "*.js"]);
});*/