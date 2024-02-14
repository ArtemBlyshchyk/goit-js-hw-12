import{a as m,i as n,S}from"./assets/vendor-64b55ca9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();async function d(t,r){m.defaults.baseURL="https://pixabay.com";const s=await m.get("/api/",{params:{key:"42191077-576543231991193ea17287b56",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:f}});if(s.status!==200)throw new Error("Failed to fetch images");return s.data.hits.length===0&&n.error({message:"Sorry, there are no images matching your search query. Please try again!",messageSize:10.5,position:"topRight"}),s.data.hits}function y(t){const r=t.map(({webformatURL:l,largeImageURL:e,tags:o,likes:i,views:b,comments:w,downloads:L})=>`<li class="gallery-item">
              <a class="gallery-link" href="${e}">
                <img
                  class="gallery-image"
                  src="${l}"
                  alt="${o}"
                />
              </a>
              <div class="image-details">
                <p><b>Likes</b> ${i}</p>
                <p><b>Views</b> ${b}</p>
                <p><b>Comments</b> ${w}</p>
                <p><b>Downloads</b> ${L}</p>
              </div>
           </li>`).join("");h.insertAdjacentHTML("beforeend",r),new S(".gallery a",{captionsData:"alt"}).refresh(),g.style.display=t.length>0?"block":"none"}const c={searchForm:document.querySelector(".search-form"),input:document.querySelector('[type="text"]')},h=document.querySelector(".gallery"),p=document.querySelector(".loader"),g=document.querySelector(".loadBtn");let a=1,u="";const f=15,q=Math.ceil(100/f);c.searchForm.addEventListener("submit",v);g.addEventListener("click",I);async function v(t){t.preventDefault();const r=c.input.value.trim();if(!r){n.error({message:"Fill in the input field!",position:"topRight"});return}p.style.display="block",u=r,a=1;try{const s=await d(u,a);P(s)}catch{n.error({message:"An error occurred while fetching images!",position:"topRight"})}finally{p.style.display="none"}c.searchForm.reset()}async function I(){if(a>q)return g.style.display="none",n.error({position:"topRight",message:"We're sorry, there are no more posts to load"});a++;try{const t=await d(u,a);y(t);const r=R();window.scrollBy({top:r*2,behavior:"smooth"})}catch(t){console.log(t),n.error({message:"An error occurred while fetching more images!",position:"topRight"})}}function P(t){h.innerHTML="",y(t)}function R(){return document.querySelector(".gallery-item").getBoundingClientRect().height}
//# sourceMappingURL=commonHelpers.js.map
