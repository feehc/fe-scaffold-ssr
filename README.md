# fe-scaffold-ssr

前端服务端渲染脚手架（egg 2.x + umi 3.x + antd 4.x）

### 开发

```bash
$ yarn
$ yarn dev
$ open http://localhost:7001/
```

### 编译

```bash
$ yarn build
```

### 发布

```bash
$ yarn start
$ yarn stop
```

### IE10+兼容

目前发现的兼容问题主要都是ES6+转换到ES5不成功引起，在/node_modules/es5-imcompatible-versions/package.json中添加以下配置即可。<br/>
后续等待umi团队在umijs中修复或者更新es5-imcompatible-versions

```
"@umijs/utils": {
  "^3.2.16": {
    "version": "^3.2.16",
    "reason": "see https://github.com/umijs/umi/blob/master/packages/utils/src/ssr.ts"
  }
},
"@umijs/bundler-webpack": {
  "^3.2.16": {
    "version": "^3.2.16",
    "reason": "see https://github.com/umijs/umi/blob/master/packages/bundler-webpack/src/getConfig/runtimePublicPathEntry.ts"
  }
},
```

[egg]: https://eggjs.org