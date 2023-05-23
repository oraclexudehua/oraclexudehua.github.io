import{_ as e,r as t,o as p,c as l,a as n,b as s,d as i,e as c}from"./app-479369cf.js";const o={},u=n("h1",{id:"关于git搭建个人博客相关操作",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#关于git搭建个人博客相关操作","aria-hidden":"true"},"#"),s(" 关于Git搭建个人博客相关操作")],-1),d=n("p",null,"GitHub Pages 本用于介绍托管在 GitHub 的项目， 但是因为免费的域名以及相对稳定的环境导致用来建立个人博客网站以及静态站点是最佳的选择。",-1),r=n("p",null,"首先关于Git Pages的技术要点比较比较简单",-1),k={class:"custom-container tip"},m=n("p",{class:"custom-container-title"},"TIP",-1),v={href:"https://pages.github.com/",target:"_blank",rel:"noopener noreferrer"},b=c(`<p>这里是因为要处理GitHub Pages中存在的俩个问题:</p><ul><li>index.html目录不能自由制定，默认是存放在根目录或者是doc目录下</li><li>相关代码建站需要构建后上传</li></ul><p>这里采用Git Action和Pages相结合的方案:</p><ol><li>首先将通过Action创建一个工作流</li><li>将工作流监听主分支相关代码的变动，主分支代码发生改动后，运行相关build以及deploy流程，</li><li>将发布结果(只有dist目录)push至gh-pages分支(这样就实现了站点代码和源码的分离)，</li><li>最后gh-pages设置为GitHub Pages 的发布分支。</li></ol><p>相关Action参数配置如下:</p><details class="custom-container details"><summary>点击展开配置样例</summary><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>
<span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy  <span class="token comment">#action 的名称</span>
  
<span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token comment"># event监听事件</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span> <span class="token comment">#当代码push的时候</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> main
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>  <span class="token comment">#当手动触发的时候</span>

<span class="token key atrule">permissions</span><span class="token punctuation">:</span>
  <span class="token key atrule">contents</span><span class="token punctuation">:</span> write <span class="token comment"># toekn的权限</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">deploy</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest  <span class="token comment">#基于ubuntu的镜像</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2 <span class="token comment">#已经被封装好的行为  检出自定义分支</span>
      <span class="token comment"># - uses: actions/setup-node@v3</span>
      <span class="token comment">#   with:</span>
      <span class="token comment">#     node-version: 16</span>
      <span class="token comment">#     cache: yarn</span>
      <span class="token comment"># - run: yarn install </span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup pnpm <span class="token comment">#行为名称</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> pnpm/action<span class="token punctuation">-</span>setup@v2  <span class="token comment">#安装依赖</span>
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 选择要使用的 pnpm 版本</span>
          <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token number">7</span>
          <span class="token comment"># 使用 pnpm 安装依赖</span>
          <span class="token key atrule">run_install</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 选择要使用的 node 版本</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token number">18</span>
          <span class="token comment"># 缓存 pnpm 依赖</span>
          <span class="token key atrule">cache</span><span class="token punctuation">:</span> pnpm

      <span class="token comment"># 运行构建脚本</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build VuePress site  <span class="token comment">#行为名称</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> pnpm docs<span class="token punctuation">:</span>build <span class="token comment">#编译代码</span>
 
      <span class="token comment"># - name: Build</span>
      <span class="token comment">#   run: yarn docs:build</span>
 
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy  <span class="token comment">#行为名称</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> peaceiris/actions<span class="token punctuation">-</span>gh<span class="token punctuation">-</span>pages@v3  <span class="token comment">#使用已经封装好的action库</span>
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">deploy_key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACTION_SECRET <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">publish_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist
          <span class="token comment"># build_dir: docs/.vuepress/dist</span>
          <span class="token key atrule">FOLDER</span><span class="token punctuation">:</span> dist
          <span class="token key atrule">CLEAN</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">publish_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">github_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACTION_SECRET <span class="token punctuation">}</span><span class="token punctuation">}</span>
          
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,6);function y(h,_){const a=t("ExternalLinkIcon");return p(),l("div",null,[u,d,r,n("div",k,[m,n("p",null,[s("请参考 "),n("a",v,[s("GitHub Pages 官方指南"),i(a)]),s(" 来获取更多信息。")])]),b])}const f=e(o,[["render",y],["__file","gitPage.html.vue"]]);export{f as default};
