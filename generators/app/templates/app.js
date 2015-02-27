var mozaik = new (require('mozaik'))(require('./config'));

<% extensions.forEach(function (extension) { %>mozaik.bus.registerApi('<%= extension %>',  require('mozaik-ext-<%= extension %>/client'));
<% }) %>
mozaik.startServer();