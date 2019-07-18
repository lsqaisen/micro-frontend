const gulp = require('gulp')
const typedoc = require('gulp-typedoc')
const browserSync = require('browser-sync').create()

const runTypeDoc = () => gulp
	.src(['src/index.ts', 'src/**/*.ts'])
	.pipe(typedoc({
		out: './docs',
		exclude: 'src/**/index.ts',
		tsconfig: 'tsconfig.json',
		target: 'ES6',
		hideGenerator: true,
	}))

const reload = (done) => {
	browserSync.reload()
	done()
}

const runBrowserSync = (done) => {
	browserSync.init({
		server: {
			baseDir: './docs/',
			index: "globals.html"
		},
	})
	done()
}

const watch = () => gulp.watch(
	['README.md', 'src/**/*.ts'],
	gulp.series(runTypeDoc, reload)
)

gulp.task('default', gulp.series(runTypeDoc, runBrowserSync, watch))