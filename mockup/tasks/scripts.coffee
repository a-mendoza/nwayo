#debug  = require 'gulp-debug'
gulp   = require 'gulp'
rename = require 'gulp-rename'

util = require './_util'
path = util.path()



#-- Lint JS
gulp.task 'scripts_lint', ->
	jshint  = require 'gulp-jshint'
	stylish = require 'jshint-stylish'
	
	return gulp.src path.files.scripts
		.pipe jshint()
		.pipe jshint.reporter(stylish)
		.pipe jshint.reporter('fail')



#-- Compile
gulp.task 'scripts_compile', ->
	include = require 'gulp-include'
	uglify  = require 'gulp-uglify'

	# Minify and copy all JavaScript (except vendor scripts)
	return gulp.src path.files.bundles_scripts
		.pipe include basePath: '../', autoExtension:true
		.pipe gulp.dest path.dir.build_scripts

	#     .pipe(uglify())
	#     .pipe(concat('all.min.js'))
	#     .pipe(gulp.dest('build/js'));
	# });
	# 

#-- Rebuild
gulp.task 'styles', (cb) ->
	del         = require 'del'
	runsequence = require 'run-sequence'

	del [path.dir.build_scripts], force:true, ->
		runsequence 'scripts_lint', 'scripts_compile', cb