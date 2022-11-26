import{_ as s,c as n,o as a,a as l}from"./app.cb7806a8.js";const d=JSON.parse('{"title":"API","description":"","frontmatter":{},"headers":[{"level":2,"title":"Methods","slug":"methods","link":"#methods","children":[{"level":3,"title":"Filter by Node Type","slug":"filter-by-node-type","link":"#filter-by-node-type","children":[]},{"level":3,"title":"Resize","slug":"resize","link":"#resize","children":[]},{"level":3,"title":"Restart","slug":"restart","link":"#restart","children":[]},{"level":3,"title":"Shutdown","slug":"shutdown","link":"#shutdown","children":[]}]},{"level":2,"title":"Properties","slug":"properties","link":"#properties","children":[{"level":3,"title":"Include Unlinked","slug":"include-unlinked","link":"#include-unlinked","children":[]},{"level":3,"title":"Labels","slug":"labels","link":"#labels","children":[]},{"level":3,"title":"Link Filter","slug":"link-filter","link":"#link-filter","children":[]},{"level":3,"title":"Node Types","slug":"node-types","link":"#node-types","children":[]}]}],"relativePath":"api/index.md"}'),e={name:"api/index.md"},o=l(`<h1 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-hidden="true">#</a></h1><p><code>GraphController</code> has various methods and properties for manipulating graphs at runtime. These are described in the following sections. The following setup is omitted from the samples for brevity.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">GraphController</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">defineGraph</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">defineGraphConfig</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">d3-graph-controller</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> container </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">graph</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#89DDFF;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HTMLDivElement</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> graph </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineGraph</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">/* ... */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> config </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineGraphConfig</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;">/* ... */</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> controller </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">GraphController</span><span style="color:#A6ACCD;">(container</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> graph</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> config)</span></span>
<span class="line"></span></code></pre></div><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-hidden="true">#</a></h2><h3 id="filter-by-node-type" tabindex="-1">Filter by Node Type <a class="header-anchor" href="#filter-by-node-type" aria-hidden="true">#</a></h3><p>Graphs can be filtered by node types. The filter can be updated at runtime as seen below.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> controller </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">GraphController</span><span style="color:#A6ACCD;">(container</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> graph</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> config)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">controller</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">filterNodesByType</span><span style="color:#A6ACCD;">(</span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nodeTypeToInclude</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">controller</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">filterNodesByType</span><span style="color:#A6ACCD;">(</span><span style="color:#FF9CAC;">false</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">nodeTypeToExclude</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><h3 id="resize" tabindex="-1">Resize <a class="header-anchor" href="#resize" aria-hidden="true">#</a></h3><p>While graphs can be <a href="/config/#resizing">configured to resize automatically</a>, manual resizing is also possible.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> controller </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">GraphController</span><span style="color:#A6ACCD;">(container</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> graph</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> config)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">controller</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resize</span><span style="color:#A6ACCD;">()</span></span></code></pre></div><h3 id="restart" tabindex="-1">Restart <a class="header-anchor" href="#restart" aria-hidden="true">#</a></h3><p>Simulations are automatically restarted when required. Should the need arise in some edge cases, simulations can be manually restarted using <code>GraphController.restart</code>.</p><p>An alpha value defining the <em>heat</em> of the simulation after restarting must be provided.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> controller </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">GraphController</span><span style="color:#A6ACCD;">(container</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> graph</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> config)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> alpha </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0.5</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">controller</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">restart</span><span style="color:#A6ACCD;">(alpha)</span></span></code></pre></div><h3 id="shutdown" tabindex="-1">Shutdown <a class="header-anchor" href="#shutdown" aria-hidden="true">#</a></h3><p>Graphs need to be integrated in framework lifecycles. In particular, it is necessary to stop the simulation and the (optional) automatic resizing.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> controller </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">GraphController</span><span style="color:#A6ACCD;">(container</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> graph</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> config)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">controller</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">shutdown</span><span style="color:#A6ACCD;">()</span></span></code></pre></div><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>Not calling <code>GraphController.shutdown</code> when a graph is removed can cause memory leaks.</p></div><h2 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-hidden="true">#</a></h2><h3 id="include-unlinked" tabindex="-1">Include Unlinked <a class="header-anchor" href="#include-unlinked" aria-hidden="true">#</a></h3><p>Unlinked nodes, i.e., nodes without incoming or outgoing links, can be included or excluded. The setting can be changed at runtime using the <code>includeUnlinked</code> property. The property can also be read to get the current state.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> controller </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">GraphController</span><span style="color:#A6ACCD;">(container</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> graph</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> config)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">controller</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">includeUnlinked </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span></code></pre></div><h3 id="labels" tabindex="-1">Labels <a class="header-anchor" href="#labels" aria-hidden="true">#</a></h3><p>Node and link labels can be toggled on and off using the respective property. Both properties can also be read to get the current state.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> controller </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">GraphController</span><span style="color:#A6ACCD;">(container</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> graph</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> config)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">controller</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">showLinkLabels </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">controller</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">showNodeLabels </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span></code></pre></div><h3 id="link-filter" tabindex="-1">Link Filter <a class="header-anchor" href="#link-filter" aria-hidden="true">#</a></h3><p>Link filters can be changed at runtime by assigning a new value as seen below. The property can also be read to get the current filter.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> controller </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">GraphController</span><span style="color:#A6ACCD;">(container</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> graph</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> config)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;">// Only include reflexive links</span></span>
<span class="line"><span style="color:#A6ACCD;">controller</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">linkFilter</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">link</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">GraphLink</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> link</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> link</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">target</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">id</span></span></code></pre></div><h3 id="node-types" tabindex="-1">Node Types <a class="header-anchor" href="#node-types" aria-hidden="true">#</a></h3><p>An array of available and currently filtered node types can be read using properties seen below.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> controller </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">GraphController</span><span style="color:#A6ACCD;">(container</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> graph</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> config)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> availableNodeTypes </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> controller</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">nodeTypes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> includedNodeTypes </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> controller</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">nodeTypeFilter</span></span></code></pre></div>`,31),p=[o];function t(r,c,i,y,C,D){return a(),n("div",null,p)}const F=s(e,[["render",t]]);export{d as __pageData,F as default};
