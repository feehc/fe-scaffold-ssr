import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  ssr: {
    devServerRender: false,
  },
  hash: true,
  outputPath: '../public',
  publicPath: '/public/',
  runtimePublicPath: true,
  manifest: {
    fileName: '../../config/manifest.json',
    // 为 ''，不然会有两个 /
    // publicPath: '', // 置空不兼容windows系统，暂时注释该设置
  },
  dva: {
    immer: true,
    // hmr: false,
  },
  dynamicImport: {},
  nodeModulesTransform: {
    type: 'none',
  },
  title: false, 
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  targets: {
    ie: 10,
  },
  routes: [
    {
      path: '/',
      component: '../layouts/Base',
      routes: [
        {
          path: '/',
          redirect: '/index',
        },
        {
          path: '/index',
          component: './index',
        },
        {
          component: './404',
        },
      ],
    },
  ],
});
