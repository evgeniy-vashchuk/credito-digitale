module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.favicon)
			.pipe(plugins.destClean(path.dist.favicon))
			.pipe(plugins.newer(path.dist.favicon))
			.pipe(gulp.dest(path.dist.favicon))
			.on('end', plugins.browserSync.reload)

		done();
	};
};