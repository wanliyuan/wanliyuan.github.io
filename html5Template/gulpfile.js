/**
 * Created by hywanliyuan on 16/8/4.
 */
var gulp = require('gulp'),
    scss = require('gulp-scss'),
    prefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    del = require('del'),
    browserSync = require('browser-sync').create();

//静态服务
gulp.task('browser-sync', function() {
    browserSync.init({
        files:"**",    //监听文件的改变
        server: {
            baseDir: './'
        }
    });
});

// 编译scss,压缩css,合并css
gulp.task('handleCSS', function() {
    gulp.src('src/css/*.scss')
        .pipe(scss())
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/all'))
        .pipe(browserSync.stream());
});

//压缩js,合并js
gulp.task('minifyJs',function(){
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest("dist/js"));
})

//监听文件的变化,然后重新编译
gulp.task('watch', function () {
    gulp.watch(['src/css/*.scss'], ['handleCSS']);
    //gulp.watch([ '*.html'],function(){
    //    console.log("html被修改了");
    //})
});

//压缩前,先删除文件夹的内容
gulp.task('clean',function(cb){
    del(['dist/css','dist/js'],cb)
})


gulp.task('default', ['handleCSS', 'browser-sync', 'watch','minifyJs','clean']);