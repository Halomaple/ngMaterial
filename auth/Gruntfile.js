module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		watch: {
			//run unit tests with karma (server needs to be already running)
			testTask: {
				files: [
						'app/css/*.scss',
						'app/**/*.html',
						'app/**/*.js',
						'!app/dist/*.*'
					],
				tasks: ['main']
			},
		},
		sass: {
			main: {
				options: {
					style: 'expanded',
					noCache: true
				},
				files: {
					'app/dist/style.css': 'app/css/style.scss',
				}
			},
			mainmin: {
				options: {
					style: 'compressed',
					noCache: true
				},
				files: {
					'app/dist/style.min.css': 'app/css/style.scss',
				}
			},
		},
		cssmin: {
			options: {
				keepSpecialComments: 0,
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			dependencies: {
				files: {
					'app/dist/dependencies.min.css': [
						'node_modules/angular-material/angular-material.min.css',
						'node_modules/bootstrap/dist/css/bootstrap.min.css',
					]
				}
			}
		},
		concat: {
			js: {
				options: {
					separator: ';',
					stripBanners: true,
				},
				src: [
					'app/app.js',
					'app/**/*.js',
					'!app/**/*.spec.js',
					'!app/dist/*.js'
				],
				dest: 'app/dist/main.js',
			},
			dependencies: {
				src: [
					'node_modules/angular/angular.min.js',
					'node_modules/angular-cookies/angular-cookies.min.js',
					'node_modules/angular-aria/angular-aria.min.js',
					'node_modules/angular-animate/angular-animate.min.js',
					'node_modules/angular-messages/angular-messages.min.js',
					'node_modules/angular-material/angular-material.min.js',
					'node_modules/angular-ui-router/release/angular-ui-router.min.js',
					'node_modules/jquery/dist/jquery.min.js',
					'node_modules/bootstrap/dist/js/bootstrap.min.js',
				],
				dest: 'app/dist/dependencies.min.js'
			}
		},
		uglify: {
			options: {
				mangle: false,
				preserveComments: false
			},
			main: {
				src: [
					'app/app.js',
					'app/**/*.js',
					'!app/dist/*.js'
				],
				dest: 'app/dist/main.min.js',
			}
		},
		copy: {
			jsmap: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							'node_modules/angular/angular.min.js.map',
							'node_modules/angular-cookies/angular-cookies.min.js.map',
							'node_modules/angular-aria/angular-aria.min.js.map',
							'node_modules/angular-animate/angular-animate.min.js.map',
							'node_modules/angular-messages/angular-messages.min.js.map',
							'node_modules/angular-ui-router/release/angular-ui-router.min.js.map',
							'node_modules/jquery/dist/jquery.min.js.map',
						],
						dest: 'app/dist/',
						filter: 'isFile'
					},
				]
			},
			cssmap: {
				files: [
					{
						expand: true,
						flatten: true,
						src: [
							'node_modules/bootstrap/dist/css/bootstrap.min.css.map',
						],
						dest: 'app/dist/',
						filter: 'isFile'
					},
				]
			}
		},
		ngtemplates: {
			main: {
				src: ['app/**/*.html'],
				dest: 'app/dist/templates.js',
				options: {
					module: 'ngAuth.templates',
					standalone: true,
					htmlmin: {
						collapseBooleanAttributes: true,
						collapseWhitespace: true,
						removeAttributeQuotes: true,
						removeComments: true, // Only if you don't use comment directives! 
						removeEmptyAttributes: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');

	//Grunt tasks
	grunt.registerTask('default', ['dist', 'watch']);
	grunt.registerTask('main', ['ngtemplates:main', 'sass', 'concat:js', 'uglify:main']);
	grunt.registerTask('dist', ['main', 'cssmin:dependencies', 'concat:dependencies', 'copy']);
};