/**
*  Default extensions
*/
var extensions = [
  'c',
  'glsl',
  'vert',
  'frag',
  'vs',
  'fs',
  'gs',
  'vsh',
  'fsh',
  'gsh',
  'vshader',
  'fshader',
  'gshader'
];

/**
*  create module for the loaded shader
*/
function createModule(body) {
  body = sanitize(body);
  body = parameterise(body);
  var module = 'export default ' + body + ';\n';
  return module;
}

/**
*  create handler function for parameterising the shader
*/
function parameterise(text) {
  function parse(params) {
    var template = text;
    params = params || {};
    for(var key in params) {
      var matcher = new RegExp('{{'+key+'}}','g');
      template = template.replace(matcher, params[key]);
    }
    return template;
  }
  return parse.toString().replace('text', text);
}

/**
*  sanitise text input so that it can be inlined in a method
*/
function sanitize(text) {
  text = text.replace(/\"/g, '\u005C\u0022');
  text = text.replace(/^(.*)/gm, '"$1');
  text = text.replace(/(.+)$/gm, '$1 \\n" +');
  text = text.replace(/\+$/, '');
  return text;
}


exports.translate = function(load) {
  load.source = createModule(load.source);
  return load.source;
};
