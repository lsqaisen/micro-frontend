# micro-frontend

## utils(工具包) 
## portal(主项目) 
### 依赖工具包portal
### 在配置文件.umirc中制定子项目路径
```
export default {
  plugins: [
    ['../utils/portal', {
      scripts: [
        `[js-url]`,
      ],
      stylesheets: [
        `css-url`,
      ],
    }],
  ],
}
```
### 运行yarn start
### 编译yarn build

## stack(子项目)