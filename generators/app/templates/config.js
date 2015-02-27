// Load environment variables from .env file if available
require('dotenv').load();

var config = {
    env:  'prod',

    host: '<%= appHost %>',
    port: process.env.PORT || <%= appPort %>,

    theme: '<%= theme %>',

    // clients configs
    api: {
    },

    // define duration beetwen each dashboard rotation (ms)
    rotationDuration: <%= rotationInterval %>,

    dashboards: [
        {
            columns: 4, rows: 3,
            widgets: [
            ]
        }
    ]
};

module.exports = config;