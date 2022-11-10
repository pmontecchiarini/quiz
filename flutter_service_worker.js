'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "47af57d7254e32e1f29aede79dc1972c",
"assets/assets/flags/arg.png": "2c22b6adcc1f43f424b1a5cea3ae2826",
"assets/assets/flags/aus.png": "67379d947b62c35c3cac2e9a51d15703",
"assets/assets/flags/bel.png": "8bd95e88fb81eb4e3251a5f8869acc8b",
"assets/assets/flags/bra.png": "212e06f365f273135beb8381b413fb7d",
"assets/assets/flags/can.png": "228373b5700cfc899018469c7b7040c0",
"assets/assets/flags/cmr.png": "bfd501280baa79af456f200b0298ea31",
"assets/assets/flags/crc.png": "5148ee4a77b68f97cd5b68ea2bd1353a",
"assets/assets/flags/cro.png": "ffda820264a99a090f7b7171c3695683",
"assets/assets/flags/den.png": "5b7de9c76789e614b45db92a941b6b0c",
"assets/assets/flags/ecu.png": "6158a454cbd038ecdf5af99b5ec20941",
"assets/assets/flags/eng.png": "e7efce4aa9634d75d334ed84f86ebaec",
"assets/assets/flags/esp.png": "ff6ae7ce44895f25686ce34014d545b9",
"assets/assets/flags/fra.png": "cd1b684e02967719e124fd05d44438b3",
"assets/assets/flags/ger.png": "c1ba806b6d0653cc9f965a20fa0a989a",
"assets/assets/flags/gha.png": "d541a9cfc0a4a446cd79ad59354fae36",
"assets/assets/flags/irn.png": "671086f9d766c5e35bd0e06c389febcf",
"assets/assets/flags/jpn.png": "d5ea83452667bcba18bb1bd9861f7383",
"assets/assets/flags/kor.png": "af5e3a8c26765d1bbf0837f58809769b",
"assets/assets/flags/ksa.png": "41077cec61cba6a8d57bcbac108e85ad",
"assets/assets/flags/mar.png": "8243f0695c6ba7841ebbb2749f9cdaaa",
"assets/assets/flags/mex.png": "a224b56a61dd1a94955b5d089b0d3e60",
"assets/assets/flags/ned.png": "e89dd1a7a3726f8d5d918fdb50530979",
"assets/assets/flags/pol.png": "1419157adc6fd36b979c736414cb83c8",
"assets/assets/flags/por.png": "b4ced987f66ae20ce689a20b41c9d546",
"assets/assets/flags/qat.png": "56aedefda1f9367b28eed5b3120e8359",
"assets/assets/flags/sen.png": "ba7c302da5ba4688c6ffb225eb26a494",
"assets/assets/flags/srb.png": "3b6c9a0d13c68ed6fb16ba690d0d3ad2",
"assets/assets/flags/sui.png": "e79db9838ec2411d59099e8fc04e6e40",
"assets/assets/flags/tun.png": "41d28180e91ce1ae1b8cdf62762c3ec4",
"assets/assets/flags/uru.png": "e8673d762129fa4582cde9c499625b19",
"assets/assets/flags/usa.png": "524f6467e399a4a621cee9b0986e50a2",
"assets/assets/flags/wal1.png": "89b0251d0c58308098beb8f5f04cb168",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "a6ada2aa4308446690c5474212843604",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "0ff5c2d72578756a2d288596d5a621dc",
"canvaskit/canvaskit.js": "687636ce014616f8b829c44074231939",
"canvaskit/canvaskit.wasm": "d4972dbefe733345d4eabb87d17fcb5f",
"canvaskit/profiling/canvaskit.js": "ba8aac0ba37d0bfa3c9a5f77c761b88b",
"canvaskit/profiling/canvaskit.wasm": "05ad694fda6cfca3f9bbac4b18358f93",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "1cfe996e845b3a8a33f57607e8b09ee4",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "505c73ea6b22835410325ca1c81e8798",
"/": "505c73ea6b22835410325ca1c81e8798",
"main.dart.js": "af06c4d8903e82d740970441cb1cb0de",
"manifest.json": "b74fa942a9bce699d19ca72aba2e9546",
"version.json": "9e8f4a2fde48611e9e82a4b4c9a9ee79"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
