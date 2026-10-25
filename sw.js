/* La Expedición Curiosa — funciona sin conexión. Cambiar CACHE al publicar una versión nueva. */
var CACHE='curiosa-v5';
var ASSETS=["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "fonts/baloo-2-latin-500-normal.woff2", "fonts/baloo-2-latin-700-normal.woff2", "fonts/baloo-2-latin-800-normal.woff2", "fonts/atkinson-hyperlegible-latin-400-normal.woff2", "fonts/atkinson-hyperlegible-latin-700-normal.woff2", "fonts/atkinson-hyperlegible-latin-400-italic.woff2"];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 var key=r.mode==='navigate'?'index.html':r;
 e.respondWith(caches.open(CACHE).then(function(c){return c.match(key,{ignoreSearch:true}).then(function(hit){
  var net=fetch(r).then(function(res){if(res&&res.ok)c.put(key,res.clone());return res;}).catch(function(){return hit;});
  return hit||net;});}));});
