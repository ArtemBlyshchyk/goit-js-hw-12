import{a as y,i as l,S as q}from"./assets/vendor-64b55ca9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();async function p(t,r){y.defaults.baseURL="https://pixabay.com";const s=await y.get("/api/",{params:{key:"42191077-576543231991193ea17287b56",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:b}});if(s.status!==200)throw new Error("Failed to fetch images");return s.data.hits.length===0&&l.error({message:"Sorry, there are no images matching your search query. Please try again!",messageSize:10.5,position:"topRight"}),s.data}function h(t){const r=t.map(({webformatURL:c,largeImageURL:e,tags:o,likes:i,views:L,comments:w,downloads:S})=>`<li class="gallery-item">
              <a class="gallery-link" href="${e}">
                <img
                  class="gallery-image"
                  src="${c}"
                  alt="${o}"
                />
              </a>
              <div class="image-details">
                <p><b>Likes</b> ${i}</p>
                <p><b>Views</b> ${L}</p>
                <p><b>Comments</b> ${w}</p>
                <p><b>Downloads</b> ${S}</p>
              </div>
           </li>`).join("");f.insertAdjacentHTML("beforeend",r),new q(".gallery a",{captionsData:"alt"}).refresh(),a.style.display=t.length>0?"block":"none"}const u={searchForm:document.querySelector(".search-form"),input:document.querySelector('[type="text"]')},f=document.querySelector(".gallery"),m=document.querySelector(".loader"),g=document.querySelector(".loader.moreLoader"),a=document.querySelector(".loadBtn");let n=1,d="";const b=15;u.searchForm.addEventListener("submit",v);a.addEventListener("click",I);async function v(t){t.preventDefault();const r=u.input.value.trim();if(!r){l.error({message:"Fill in the input field!",position:"topRight"});return}m.style.display="block",d=r,n=1;try{const s=await p(d,n);P(s.hits)}catch{l.error({message:"An error occurred while fetching images!",position:"topRight"})}finally{m.style.display="none"}u.searchForm.reset()}async function I(){a.style.display="none",g.style.display="block",n++;try{const t=await p(d,n);h(t.hits);const r=Math.ceil(t.totalHits/b);if(n>=r)return a.style.display="none",l.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."});a.style.display="block";const s=H();window.scrollBy({top:s*2,behavior:"smooth"})}catch(t){console.log(t),l.error({message:"An error occurred while fetching more images!",position:"topRight"})}finally{g.style.display="none"}}function P(t){f.innerHTML="",h(t)}function H(){return document.querySelector(".gallery-item").getBoundingClientRect().height}
//# sourceMappingURL=commonHelpers.js.map
