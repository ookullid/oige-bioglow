const CACHE='kita-v12';
const CORE=["./","./index.html","./style.css?v=18","./auth.css?v=1","./features.css?v=2","./lab.css?v=1","./design.css?v=1","./pages.css?v=1","./plant-data.js?v=16","./app.js?v=21","./auth.js?v=3","./features.js?v=7","./i18n.js?v=4","./lab.js?v=4","./pages.js?v=2","./manifest.webmanifest","./icon.svg"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&(k.startsWith('kita-')||k.startsWith('bioglow-'))).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==location.origin)return;
  event.respondWith((async()=>{
    try{
      const response=await fetch(event.request);
      if(response.ok){const copy=response.clone();try{const cache=await caches.open(CACHE);await cache.put(event.request,copy);}catch{}}
      return response;
    }catch{
      const cached=await caches.match(event.request);if(cached)return cached;
      if(event.request.mode==='navigate'){const page=await caches.match('./index.html');if(page)return page;}
      return new Response('Offline: resource unavailable',{status:503,headers:{'Content-Type':'text/plain'}});
    }
  })());
});
