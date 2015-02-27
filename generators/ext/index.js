var generators = require('yeoman-generator');
var chalk      = require('chalk');
var npmName    = require('npm-name');

module.exports = generators.Base.extend({
    initPackageJson: function () {

    },

    installNpmDependencies: function () {
        //this.npmInstall(['del'], { 'saveDev': true });
        //this.npmInstall(['gulp'], { 'saveDev': true });
        //this.npmInstall(['gulp-6to5'], { 'saveDev': true });
        //this.npmInstall(['gulp-regex-replace'], { 'saveDev': true });
        //this.npmInstall(['gulp-rename'], { 'saveDev': true });
        //this.npmInstall(['gulp-strip-debug'], { 'saveDev': true });
        //this.npmInstall(['jest'], { 'saveDev': true });
        //this.npmInstall(['jest-cli'], { 'saveDev': true });
        //this.npmInstall(['lodash'], { 'saveDev': true });
        //this.npmInstall(['mozaik'], { 'saveDev': true });
        //this.npmInstall(['react'], { 'saveDev': true });
        //this.npmInstall(['react-tools'], { 'saveDev': true });
        //this.npmInstall(['reflux'], { 'saveDev': true });
    },

    prompting: {
        askForExtensionName: function () {
            var done = this.async();

            var prompts = [
                {
                    name:    'extensionName',
                    message: 'What\'s the name of your awesome Mozaïk extension?'
                },
                {
                    type:    'confirm',
                    name:    'askNameAgain',
                    message: 'It seems that this mozaik extension name above already exists on npm, choose another?',
                    default: true,
                    when:    function (answers) {
                        var done = this.async();
                        var name = 'mozaik-ext-' + answers.extensionName;

                        npmName(name, function (err, available) {
                            if (!available) {
                                done(true);
                            }

                            done(false);
                        });
                    }
                }
            ];

            this.prompt(prompts, function (props) {
                if (props.askNameAgain) {
                    return this.prompting.askForExtensionName.call(this);
                }

                this.extensionName    = props.extensionName;
                this.extensionPkgName = 'mozaik-ext-' + props.extensionName;

                done();
            }.bind(this));
        }
    },

    writing: {
        projectfiles: function () {
            this.template('_package.json', 'package.json');
            this.template('_travis.yml', '.travis.yml');
            this.template('_gitignore', '.gitignore');
            this.template('_npmignore', '.npmignore');
            this.template('README.md');

            this.copy('preprocessor.js', 'src/preprocessor.js');
        }
    }
});