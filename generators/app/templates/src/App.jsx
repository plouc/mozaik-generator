var React         = require('react');
var mozaik        = require('mozaik/browser');
var Mozaik        = mozaik.Component.Mozaik;
var ConfigActions = mozaik.Actions.Config;

<% extensions.forEach(function (extension) { %>mozaik.addBatch('<%= extension %>', require('mozaik-ext-<%= extension %>'));
<% }) %>
React.render(<Mozaik />, document.getElementById('mozaik'));

ConfigActions.loadConfig();