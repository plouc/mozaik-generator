var generators = require('yeoman-generator');
var chalk      = require('chalk');
var npmName    = require('npm-name');
var _          = require('lodash');

module.exports = generators.Base.extend({
    init: function () {
        this.extensions = [];
    },

    initPackageJson: function () {

    },

    installNpmDependencies: function () {
    },

    prompting: {
        askForDashboardName: function () {
            var done = this.async();

            this.prompt({
                name:    'dashboardName',
                message: 'What\'s the name of your awesome Mozaïk dashboard?'
            }, function (answers) {
                this.dashboardName = answers.dashboardName;

                done();
            }.bind(this));
        },

        askForHostSettings: function () {
            var done = this.async();

            var prompts = [
                {
                    name:    'host',
                    message: 'Application host',
                    default: 'localhost'
                },
                {
                    name:    'port',
                    message: 'Application port',
                    default: 5000
                },
            ];

            this.prompt(prompts, function (answers) {
                this.appHost = answers.host;
                this.appPort = answers.port;

                done();
            });
        },

        askForTheme: function () {
            var done = this.async();

            this.prompt({
                type:    'list',
                name:    'theme',
                message: 'Choose a theme for your dashboard',
                default: 'night-blue',
                choices: [
                    'night-blue',
                    'light-grey',
                    'yellow',
                    'light-yellow',
                    'bordeau'
                ]
            }, function (answers) {
                this.theme = answers.theme;

                done();
            }.bind(this));
        },

        askForDashboardRotationInterval: function () {
            var done = this.async();

            this.prompt({
                name:    'rotationInterval',
                message: 'Choose an interval for dashboard rotation',
                default: 4000,
            }, function (answers) {
                this.rotationInterval = answers.rotationInterval;

                done();
            }.bind(this));
        },

        askForExtension: function () {
            var done = this.async();

            this.prompt({
                type:    'list',
                name:    'extension',
                message: 'Select an extension to install or select `none` to continue',
                choices: [
                    'none',
                    'aws',
                    'github',
                    'heroku',
                    'jenkins',
                    'sensu',
                    'time',
                    'travis',
                    'twitter',
                    'weather'
                ]
            }, function (answers) {
                if (answers.extension !== 'none') {
                    this.extensions.push(answers.extension);

                    return this.prompting.askForExtension.call(this);
                }

                // dedupe extensions
                this.extensions = _.uniq(this.extensions);

                done();
            }.bind(this));
        }
    },

    writing: {
        projectfiles: function () {
            this.template('_package.json', 'package.json');
            this.template('_gitignore',    '.gitignore');
            this.template('_gulpfile.js',  'gulpfile.js');
            this.template('_env',          '.env');
            this.template('config.js',     'config.js');
            this.template('app.js',        'app.js');
            this.template('src/App.jsx',   'src/App.jsx');
        }
    }
});