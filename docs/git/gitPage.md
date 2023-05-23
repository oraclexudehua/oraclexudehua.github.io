# 关于Git搭建个人博客相关操作

GitHub Pages 本用于介绍托管在 GitHub 的项目， 但是因为免费的域名以及相对稳定的环境导致用来建立个人博客网站以及静态站点是最佳的选择。 

首先关于Git Pages的技术要点比较比较简单
::: tip
请参考 [GitHub Pages 官方指南](https://pages.github.com/) 来获取更多信息。
:::  

这里是因为要处理GitHub Pages中存在的俩个问题:  

- index.html目录不能自由制定，默认是存放在根目录或者是doc目录下  
- 相关代码建站需要构建后上传  

这里采用Git Action和Pages相结合的方案:
1. 首先将通过Action创建一个工作流
2. 将工作流监听主分支相关代码的变动，主分支代码发生改动后，运行相关build以及deploy流程，
3. 将发布结果(只有dist目录)push至gh-pages分支(这样就实现了站点代码和源码的分离)，
4. 最后gh-pages设置为GitHub Pages 的发布分支。


相关Action参数配置如下:

::: details 点击展开配置样例
```yml

name: Deploy  #action 的名称
  
on: # event监听事件
  push: #当代码push的时候
    branches:
      - main
  workflow_dispatch:  #当手动触发的时候

permissions:
  contents: write # toekn的权限

jobs:
  deploy:
    runs-on: ubuntu-latest  #基于ubuntu的镜像
    steps:
      - uses: actions/checkout@v2 #已经被封装好的行为  检出自定义分支
      # - uses: actions/setup-node@v3
      #   with:
      #     node-version: 16
      #     cache: yarn
      # - run: yarn install 

      - name: Setup pnpm #行为名称
        uses: pnpm/action-setup@v2  #安装依赖
        with:
          # 选择要使用的 pnpm 版本
          version: 7
          # 使用 pnpm 安装依赖
          run_install: true

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          # 选择要使用的 node 版本
          node-version: 18
          # 缓存 pnpm 依赖
          cache: pnpm

      # 运行构建脚本
      - name: Build VuePress site  #行为名称
        run: pnpm docs:build #编译代码
 
      # - name: Build
      #   run: yarn docs:build
 
      - name: Deploy  #行为名称
        uses: peaceiris/actions-gh-pages@v3  #使用已经封装好的action库
        with:
          deploy_key: ${{ secrets.ACTION_SECRET }}
          publish_dir: docs/.vuepress/dist
          # build_dir: docs/.vuepress/dist
          FOLDER: dist
          CLEAN: true
          publish_branch: gh-pages
        env:
          github_token: ${{ secrets.ACTION_SECRET }}
          
```
:::