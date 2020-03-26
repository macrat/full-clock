const CACHE_VERSION = 'v1';
const CACHE_NAME = `FullClock#${CACHE_VERSION}`;


const urlsToCache = [
    '.',
    'clock.js',
];


self.addEventListener('install', ev => {
    ev.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});


self.addEventListener('activate', ev => {
    ev.waitUntil(
        caches.keys().then(names => (
            names.filter(name => name.startsWith('FullClock#') && name !== CACHE_NAME)
        )).then(names => (
            Promise.all(names.map(name => caches.delete(name)))
        ))
    );
});


self.addEventListener('fetch', ev => {
    ev.respondWith(
        caches.match(ev.request).then(resp => {
            if (resp) return resp;

            let req2 = ev.request.clone();

            return fetch(ev.request).then(resp => {
                if (!resp || resp.status !== 200 || resp.type !== 'basic') {
                    return resp;
                }

                let resp2 = resp.clone();

                caches.open(CACHE_NAME).then(cache => cache.put(req2, resp2));

                return resp;
            });
        })
    );
});
