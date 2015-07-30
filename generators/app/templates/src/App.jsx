import React         from 'react';
import Mozaik        from 'mozaik/browser';


const MozaikComponent = Mozaik.Component.Mozaik;
const ConfigActions   = Mozaik.Actions.Config;


<% extensions.forEach(function (extension) { %>Mozaik.Registry.addExtension('<%= extension.id %>', require('mozaik-ext-<%= extension.id %>'));
<% }) %>
React.render(<MozaikComponent />, document.getElementById('mozaik'));

ConfigActions.loadConfig();