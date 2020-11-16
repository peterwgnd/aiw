---
layout: layouts/base.njk
pageClass: chapters
templateEngineOverride: njk, md
---
<article id="main-text">
<header class="chapter-header">
	<img src="../../images/{{ metaImage }}">
	<h1>Chapter {{ chapter | roman }}</h1>
	<p>{{ title }}</p>
</header>
<main>
  {{ content | safe }}
  <div class="footnote">
  	<button id="load">Load Next Chapter</button>
  	<a href="../chapter-{{ chapter - 1 }}">previous chapter</a>
  	<a href="../chapter-{{ chapter + 1 }}">next chapter</a>
  </div>
</main>
</article>
<script>
async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
};
async function loadPage() {
console.log("loading chapter {{ chapter + 1 }}")
const contentDiv = document.documentElement;
window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
contentDiv.innerHTML = await fetchHtmlAsText("../chapter-{{ chapter + 1 }}");
history.pushState('chapter {{ chapter + 1 }}','','../chapter-{{ chapter + 1 }}');
};
const load = document.getElementById("load");
load.addEventListener('click', function(e){
	e.preventDefault();
	loadPage();
	return;
});
</script>