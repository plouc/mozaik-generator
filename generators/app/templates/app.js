var mozaik = new (require('mozaik'))(require('./config'));

<% extensions.filter(function (extension) {
    return extension.client === true;
}).forEach(function (extension) { %>mozaik.bus.registerApi('<%= extension.id %>',  require('mozaik-ext-<%= extension.id %>/client'));
<% }) %>
mozaik.startServer();