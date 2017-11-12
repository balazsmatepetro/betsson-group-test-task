module.exports = function (grunt) {
    const distPath = 'dist';
    const jsSourceFilesPath = 'src/**/*.js';
    const jsTemplateFilePath = `${distPath}/js/templates.js`;
    
    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    'dist/js/app.js': [
                        jsSourceFilesPath,
                        jsTemplateFilePath
                    ]
                },
                options: {
                    transform: [['babelify', {
                        presets: "es2015"
                    }]],
                    browserifyOptions: {
                        debug: true
                    }
                }
            }
        },
        clean: {
            dist: ['dist']
        },
        eslint: {
            options: {
                configFile: '.eslintrc'
            },
            sources: [
                jsSourceFilesPath
            ]
        },
        ngtemplates: {
            app: {
                src: 'src/**/*.html',
                dest: jsTemplateFilePath
            }
        },
        sass: {
            'app': {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/css/app.css': 'scss/main.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.registerTask('dev', [
        'eslint',
        'clean',
        'ngtemplates',
        'browserify',
        'sass'
    ]);
};
