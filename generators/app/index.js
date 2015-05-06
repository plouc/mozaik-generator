var generators = require('yeoman-generator');
var chalk      = require('chalk');
var npmName    = require('npm-name');
var _          = require('lodash');

// Available extensions
var extensions = [
    { id: 'none'                                               },
    { id: 'aws',       name: 'AWS',              client: true  },
    { id: 'github',    name: 'github',           client: true  },
    { id: 'analytics', name: 'google analytics', client: true  },
    { id: 'calendar',  name: 'google calendar',  client: true  },
    { id: 'sheets',    name: 'google sheets',    client: true  },
    { id: 'heroku',    name: 'heroku',           client: true  },
    { id: 'image',     name: 'image',            client: true  },
    { id: 'jenkins',   name: 'jenkins',          client: true  },
    { id: 'sensu',     name: 'sensu',            client: true  },
    { id: 'time',      name: 'time',             client: false },
    { id: 'travis',    name: 'travis',           client: true  },
    { id: 'twitter',   name: 'twitter',          client: true  },
    { id: 'weather',   name: 'weather',          client: true  }
];

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

            var choices = _.map(extensions, function (extension) {
                return {
                    name:  extension.name,
                    value: extension.id
                };
            });

            this.prompt({
                type:    'list',
                name:    'extension',
                message: 'Select an extension to install or select `none` to continue',
                choices: choices
            }, function (answers) {
                if (answers.extension !== 'none') {
                    var extension = _.find(extensions, { id: answers.extension });
                    if (typeof extension !== 'undefined') {
                        this.extensions.push(extension);
                    }

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