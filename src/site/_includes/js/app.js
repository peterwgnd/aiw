async function fetchHtmlAsText(url) {
    return await (await fetch(url)).text();
};
async function loadPage(dir) {
let d;
dir == "+" ? d = 1 : d = -1;
let c = new Number("{{ chapter }}") + d;
console.log(`loading chapter ${c}`)
const contentDiv = document.documentElement;
window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
contentDiv.innerHTML = await fetchHtmlAsText(`../chapter-${ c }`);
history.pushState(`chapter ${c}`,'',`../chapter-${ c }`);
};
const load = document.getElementById("load");
const container = document.querySelector("#main-text main");
load.addEventListener('click', function(e){
    splitContent(container)
});

function notInViewport (el) {

    var rect = el.getBoundingClientRect();

    return (
        (rect.top <= 0 && rect.bottom <= 0) || (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= (window.innerHeight || document.documentElement.clientHeight))
    );
}

function splitContent (container) {
    let els = [...container.children];
    let inVp = [];
    let d;
    let dInit = .25;
    let dMax = 2;
    let n = .25;
    els.forEach(x => notInViewport(x) ? x.setAttribute("style","opacity:0;") : inVp.push(x));
    inVp.forEach(x => {
        x.innerHTML = x.textContent.replace(/\S/g, `<span class="letter">$&</span>`);
    });
    letters = document.querySelectorAll(".letter");
    letters.forEach(x => {
        if(!d) {
            d = dInit + (Math.random()*n)*(Math.round(Math.random) === 1 ? 1 : -1);
        } else {
            d = d + (Math.random()*n)*(Math.round(Math.random) === 1 ? 1 : -1);
            if( d > dMax) {
                d = dMax - (Math.random()*n);
            }
            if (d < 0) {
                d = 0 + (Math.random()*n);
            }
        }
        x.setAttribute("style", `transition-delay: ${d}s`);
    });
    container.classList.add("animate");
}