module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		qunit: {
			files: ['tests/*.html'],
		},
		jsonlint: {
			scripts: {
				src: [ 'sjs/**/*.json', 'data/**/*.json' ]
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'sjs/core/**/*.js', 'tests/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true,
					strict: true,
					smarttabs: true,
					trailing: true
				}
			}
		},
		watch: {
			scripts: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint', 'qunit', 'snockets'],
				options: {
					debounceDelay: 250,
					livereload: true,
					spawn: false
				}
			},
			css: {
				files: ['scss/**/*.scss', 'scss/**/*.sass', 'scss/**/*.css'],
				tasks: ['compass:dev'],
				options: {
					debounceDelay: 250,
					livereload: true,
					spawn: false
				}
			}
		},
		meta: {
			buildDirectory: 'js',
			header: '',
			footer: '',
		},
		snockets: {
			core: {
				src: ['sjs/core/main.js', 'sjs/core/head.js', 'sjs/core/libs.js'],
				options: {
					concat: {
						header: '<%= meta.header %>',
						destExtension: "js",
						destDir: "<%= meta.buildDirectory %>",
						footer: '<%= meta.footer %>'
					},
					min: {
						destExtension: "js",
						destDir: "<%= meta.buildDirectory %>"
					}
				}
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: 'scss',
					cssDir: 'css',
					environment: 'production'
				}
			},
			dev: {
				options: {
					sassDir: 'scss',
					cssDir: 'css'
				}
			}
		},
		exec: {
			install_hooks: {
				command: 'hooks/hooks-installer'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-barkeep');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsonlint');
	grunt.loadNpmTasks('grunt-beep');
	grunt.loadNpmTasks('grunt-exec');

	// Default task(s).
	grunt.registerTask('lint', [ 'jshint', 'jsonlint']);
	grunt.registerTask('test', [ 'jshint', 'jsonlint', 'qunit', 'beep:error' ]);
	grunt.registerTask('default', ['exec:install_hooks', 'jshint', 'jsonlint', 'qunit', 'compass:dist', 'snockets', 'beep:error']);
	grunt.registerTask('travis', ['jshint', 'jsonlint','qunit']);

};
