'use strict';

// had enabled by egg
// exports.static = true;

exports.httpProxy = {
  enable: true,
  package: 'egg-http-proxy',
};  

exports.assets = {
  enable: true,
  package: 'egg-view-assets',
};

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
