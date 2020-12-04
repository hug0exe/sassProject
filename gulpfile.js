const { src, dest, symlink, parallel, watch } = require('gulp');
const del = require('del')
const gulpSass = require('gulp-sass')
const browserSync = require('browser-sync').create();


// recharge le navigateur
function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch('*.html').on("change", browserSync.reload);
}

// scss to css
function sass() {
    return src('./sass/import.scss')
        .pipe(gulpSass())
        .pipe(dest('./css/'))
        .pipe(browserSync.stream())
}

// Watch sass
function watcher(done) {
    watch('./sass/', sass)
    browserSync.reload();
    done();
}




// lancer la fonction browser et watcher en parallele


module.exports = {
    // build: parallel(css, sass)
    sass,
    watcher,
    browser: parallel(browser, watcher)
}