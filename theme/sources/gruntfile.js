module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// js
		jshint: {
			core_js: {
				src: ['js/**/*.js', '!libs/**/*.js', '!js/plugins/**/*.js']
			}
		},
		requirejs: {
			core_js: {
				options: {
					onBuildWrite: function (moduleName, path, contents) { return '/* generated by grunt on ' + new Date().toJSON().substring(0,19).replace('T',' ') + ' */\n' + contents; },
					baseUrl:  './',
					name:     'js/core',
					include:  ['js/variants'],
					out:      '../assets/builds/core.js',
					optimize: 'uglify', // 'none'
					preserveLicenseComments: false,
					skipModuleInsertion:     true,
					findNestedDependencies:  true,
					pragmasOnSave:           { excludeRequire: true }
				}
			}
		},


		// less css
		less: {
			core_less: {
				files: { '../assets/builds/core.css': 'less/loader.less' }
			},
			editor_less: {
				files: { '../assets/builds/editor.css': 'less/cms/editor.less' },
				options: { yuicompress:true }
			}
		},
		cssmin: {
			core_css: {
				options: { banner: '/* generated by grunt on <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */' },
				files: {
					'../assets/builds/core.css': [
						'less/libs/reset.css',
						'less/libs/normalize.css',
						'less/libs/html5boilerplate.css',
						'../assets/builds/core.css'
					]
				}
			}
		},


		// watcher
		watch: {
			all: {
				files: ['gruntfile.js', 'package.json'],
				tasks: 'default'
			},
			core_js: {
				files: ['js/**/*.js', 'libs/**/*.js'],
				tasks: 'core_js'
			},
			core_less: {
				files: ['less/**/*.less', 'less/**/*.css', '!less/cms/**/*.less'],
				tasks: 'core_less'
			},
			less_editor: {
				files: ['less/cms/editor.less'],
				tasks: 'editor_less'
			}
		}
	});

	// load plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// tasks
	grunt.registerTask('core_js',     ['jshint:core_js','requirejs:core_js']);
	grunt.registerTask('core_less',   ['less:core_less','cssmin:core_css','editor_less']);
	grunt.registerTask('editor_less', ['less:editor_less']);
	grunt.registerTask('default',     ['core_js','core_less']);
};