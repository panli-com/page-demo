var gulp = require('gulp');

var day = '20160812';
var cssName = 'app.css',
    minjs = 'app.js',
    proPath = '/Users/julaud/www/panli/sf-panli-com/Ued/pc/index/build/';

// 引入组件
var sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    saveLicense = require('uglify-save-license'),
    autoprefixer = require('gulp-autoprefixer'),
    zip = require('gulp-zip');

var ejs = require("gulp-ejs");

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// var prodUrl = '/Users/julaud/www/panli/sf-panli-com/Ued/pc/index/build/';

gulp.task('ejs', function() {

    return gulp.src('./' + day + '/templates/layout.ejs')
        .pipe(ejs({
            title: "免邮商家"
        }))
        .pipe(gulp.dest('./' + day + '/.tmp'))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./' + day + '/'))
        .pipe(reload({ stream: true }))
        .pipe(notify({ message: 'ejs task complete' }));


})

//编译Sass，Autoprefix及缩小化
gulp.task('sass', function() {


    return gulp.src('./' + day + '/src/scss/main.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./' + day + '/.tmp/css'))
        .pipe(rename(cssName))
        .pipe(minifycss())
        .pipe(gulp.dest('./' + day + '/build/css/'))
        // .pipe(gulp.dest(prodUrl + '/css/'))
        // .pipe(reload({stream: true}))
        .pipe(notify({ message: 'Styles  task complete' }));
});


gulp.task('onescss', function() {
    return gulp.src('./' + day + '/images/edm/emd.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename('emd.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./' + day + '/images/edm/'))
        .pipe(reload({ stream: true }))
        .pipe(notify({ message: 'onescss  task complete' }));

});

gulp.task('home', function() {
    return gulp.src('./home/scss/main.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./home/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('./home/css/'))
        .pipe(reload({ stream: true }))
        .pipe(notify({ message: 'home style  task complete' }));

});

gulp.task('html', function() {
    gulp.src('./' + day + '/*.html')
        .pipe(reload({ stream: true }))
});

gulp.task('homeHtml', function() {
    gulp.src('./*.html')
        .pipe(reload({ stream: true }))
});

gulp.task('scripts', function() {
    return gulp.src('./' + day + '/src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./' + day + '/tmp/js'))
        .pipe(rename(minjs))
        .pipe(uglify())
        .pipe(gulp.dest('./' + day + '/build/js/'))
        // .pipe(gulp.dest(prodUrl + '/js/'))
        .pipe(reload({ stream: true }))
        .pipe(notify({ message: 'Scripts task complete' }));

});


//zip
gulp.task('zip', function() {
    return gulp.src(['./' + day + '/main.min.css', './' + day + '/host.html'])
        .pipe(zip('special' + day + '.zip'))
        .pipe(gulp.dest('' + day + ''))
        .pipe(notify({ message: 'zip task complete' }));
});

gulp.task('pro', function() {
    return gulp.src('./' + day + '/build/**/*')
        .pipe(gulp.dest(proPath))
        .pipe(notify({ message: 'pro ok' }));
})


// 静态服务器 + 监听 scss/html 文件
gulp.task('dev', ['sass'], function() {

    browserSync.init({
        server: './' + day + '/'
    });

    // 看守.scss 档
    gulp.watch('./' + day + '/src/scss/**/*.scss', ['sass']);
    gulp.watch('./' + day + '/src/scss/*.scss', ['sass']);
    gulp.watch('./home/scss/*.scss', ['home']);
    // 看守所有.js档
    gulp.watch('./' + day + '/*.js', ['scripts']);
    gulp.watch('./' + day + '/src/js/*.js', ['html', 'scripts']);

    // 看守所有.html
    gulp.watch('./' + day + '/*.html').on('change', reload);;
    gulp.watch(['./' + day + '/templates/*.html', './' + day + '/templates/*.ejs'], ['ejs']);
    gulp.watch('./*.html').on('change', reload);;

});


gulp.task('serve', ['watch']);

gulp.task('default', ['dev']);