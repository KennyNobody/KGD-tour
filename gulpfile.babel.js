"use strict";

import { src, dest, watch, parallel, series } from "gulp";
import browsersync from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import sass from "gulp-sass";
import mincss from "gulp-clean-css";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import imagemin from "gulp-imagemin";
import pngquant from "imagemin-pngquant";
import imageminJpegRecompress from "imagemin-jpeg-recompress";
import favicons from "gulp-favicons";
import gcmq from "gulp-group-css-media-queries";
import svgSprite from "gulp-svg-sprites";
import replace from "gulp-replace";
import rigger from "gulp-rigger";
import plumber from "gulp-plumber";
import debug from "gulp-debug";
import clean from "gulp-clean";

const paths = {
	src: {
		html: [
		"./src/views/*.html",
		],
		styles: [
		"./src/styles/*.scss",
		"./src/styles/**/*.scss"
		],
		scripts: "./src/js/**/*.js",
		favicons: "./src/img/favicons/*.{jpg,jpeg,png,gif}",
		images: [
		"./src/img/**/*.{jpg,jpeg,png,gif,svg}",
		"!./src/img/icons/svg/*",
		"!./src/img/favicons/*.{jpg,jpeg,png,gif}"
		],
		sprites: "./src/img/icons/svg/*.svg",
		server_config: "./src/.htaccess"
	},
	build: {
		clean: ["./docs/*", "./docs/.*"],
		general: "./docs/",
		styles: "./docs/styles/",
		scripts: "./docs/js/",
		favicons: "./docs/img/favicons/",
		images: "./docs/img/",
		sprites: "./docs/img/sprites/",
	}
};

// custom libraries
const finalLibs = [
"./src/libs/swiper/js/swiper.min.js",
"./src/libs/scroll/OverlayScrollbars.min.js",
// "./src/libs/modal/micromodal.min.js",
paths.src.scripts
];

// Файлы для отслеживания
const finalBlocks = [
"./src/views/*.html",
"./src/views/**/*.html",
];

// GENERAL
export const cleanFiles = () => src(paths.build.clean, {read: false})
.pipe(clean())
.pipe(debug({"title": "Cleaning..."}));

export const server = () => {
	browsersync.init({
		server: paths.build.general,
		port: 3000,
		tunnel: false,
		notify: false
	});
};

export const watchDev = () => {
	watch(finalBlocks, htmlDev);
	watch(paths.src.styles, stylesDev);
	watch(paths.src.scripts, scriptsDev);
	watch(paths.src.images, imagesDev);
	watch(paths.src.sprites, sprites);
};

export const sprites = () => src(paths.src.sprites)
.pipe(svgSprite({
	preview: false,
	mode: "symbols",
	selector: "icon-%f",
	cssFile: "../../../src/styles/partials/_sprite.scss",
	svg: {
		sprite: "../../../docs/img/sprites/sprite.svg"
	}
}))
.pipe(dest(paths.build.sprites))
.pipe(debug({"title": "Sprites"}))
.on("end", browsersync.reload);

export const favs = () => src(paths.src.favicons)
.pipe(favicons({
	icons: {
		appleIcon: true,
		favicons: true,
		online: false,
		appleStartup: false,
		android: false,
		firefox: false,
		yandex: false,
		windows: false,
		coast: false
	}
}))
.pipe(dest(paths.build.favicons))
.pipe(debug({"title": "Favicons"}));


// DEV MODE
export const htmlDev = () => src(paths.src.html)
.pipe(rigger())
.pipe(dest(paths.build.general))
.on("end", browsersync.reload);

export const stylesDev = () => src("./src/styles/**/main.scss")
.pipe(plumber())
.pipe(sourcemaps.init())
.pipe(sass())
.pipe(gcmq())
.pipe(replace("../../docs/", "../"))
.pipe(plumber.stop())
.pipe(sourcemaps.write("./maps/"))
.pipe(dest(paths.build.styles))
.on("end", browsersync.reload);

export const scriptsDev = () => src(finalLibs)
.pipe(sourcemaps.init())
.pipe(concat("main.js"))
// .pipe(babel())
// .pipe(uglify())
.pipe(rename({suffix: ".min"}))
.pipe(sourcemaps.write("./maps/"))
.pipe(dest(paths.build.scripts))
.on("end", browsersync.reload);

export const imagesDev = () => src(paths.src.images)
.pipe(dest(paths.build.images))
.on("end", browsersync.reload);


// PRODUCTION MODE
export const htmlProd = () => src(paths.src.html)
.pipe(rigger())
.pipe(replace("main.css", "main.min.css"))
.pipe(replace("main.js", "main.min.js"))
.pipe(dest(paths.build.general))
.pipe(debug({"title": "HTML files"}));

export const stylesProd = () => src("./src/styles/**/main.scss")
.pipe(plumber())
.pipe(sass())
.pipe(gcmq())
.pipe(autoprefixer({browsers: ["last 12 versions", "> 1%", "ie 8", "ie 7"]}))
.pipe(mincss({compatibility: "ie8", level: {1: {specialComments: 0}}}))
.pipe(rename({suffix: ".min"}))
.pipe(replace("../../docs/", "../"))
.pipe(plumber.stop())
.pipe(dest(paths.build.styles))
.pipe(debug({"title": "CSS files"}));

export const scriptsProd = () => src(finalLibs)
.pipe(concat("main.js"))
// .pipe(babel())
// .pipe(uglify())
.pipe(rename({suffix: ".min"}))
.pipe(dest(paths.build.scripts))
.pipe(debug({"title": "JS files"}));

export const imagesProd = () => src(paths.src.images)
.pipe(imagemin([
	imagemin.gifsicle({interlaced: true}),
	imagemin.jpegtran({progressive: true}),
	imageminJpegRecompress({loops: 1, quality: "low"}),
	imagemin.svgo({plugins: [{removeViewBox: true}]}),
	imagemin.optipng({optimizationLevel: 5}),
	pngquant({quality: "65-70", speed: 5})
	]))
.pipe(dest(paths.build.images))
.pipe(debug({"title": "Images"}));

export const serverConfig = () => src(paths.src.server_config)
.pipe(dest(paths.build.general))
.pipe(debug({"title": "Server config"}));

export const dev = series(cleanFiles, sprites, parallel(
	htmlDev,
	stylesDev,
	scriptsDev,
	imagesDev,
	favs
	), parallel(watchDev, server));

export const build = series(
	cleanFiles,
	sprites,
	serverConfig,
	htmlProd,
	stylesProd,
	scriptsProd,
	imagesProd,
	favs
	);

export default dev;