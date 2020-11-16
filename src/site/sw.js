var CACHE_NAME = 'cache-1';
var urlsToCache = [
  '/chapters/chapter-1/index.html',
  '/chapters/chapter-2/index.html',
  '/chapters/chapter-3/index.html',
  '/chapters/chapter-4/index.html',
  '/chapters/chapter-5/index.html',
  '/chapters/chapter-6/index.html',
  '/chapters/chapter-7/index.html',
  '/chapters/chapter-8/index.html',
  '/chapters/chapter-9/index.html',
  '/chapters/chapter-10/index.html',
  '/chapters/chapter-11/index.html',
  '/chapters/chapter-12/index.html',
  '/css/styles.css'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});