# tampermonkey-builder

基于 rollip 的油猴脚本开发工具。  

## 使用

克隆本仓库到本地，添加你的脚本, 按照下面步骤进行开发调试。  
如果希望写的脚本可以被其他人复用，可以使用 Github Pages 或 Gitlab Pages 实现在线托管。  

## 本地开发调试  

1. 获取 tampermonkey 本地调试脚本: `npm run file`, 会打印出一串东西。  
   从控制台复制 `// ==UserScript==` 到 `// ==/UserScript==` 添加到 tampermonkey  

2. 确认 tampermonkey 被允许访问本文文件路径  

3. 访问网页即可  

## 构建

执行下面命令进行构建:  

``` bash
$ npm run build
```

`src/entries` 下面的有多少目录，就会在 `dist` 下面生成多少个 js 文件，这些文件都是可以直接在油猴脚本管理器中引用。  

### dist 文件说明

* `dist/main.js` 是所有脚本入口，里面引用了 `src/entries` 下面的所有脚本。
* `dist` 下除了 `main.js` 之外的所有文件，是独立的入口文件，方便单独引入。  

## Q&A

### 如何在线引用?

可以使用 Github Pages/ Gitlab Pages 发布，从而方便引用。  
