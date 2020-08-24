'use strict';
const path = require('path');

module.exports = (appInfo) => {
  const config = (exports = {});
  const API_HOST = 'https://www.baidu.com'; // 后台服务地址

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513765449219_5858';

  // add your config here
  config.middleware = [];

  config.assets = {
    publicPath: '/public',
  };

  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
    defaultViewEngine: 'nunjucks',
  };

  config.proxy = true;

  config.security = {
    csrf: false,
    xframe: {
      enable: false,
    },
  };

  config.seo = {
    apiUrl: `${API_HOST}/api/agency/core/web/seo`,
  };

  return config;
};
