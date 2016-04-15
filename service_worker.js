'use strict';


self.addEventListener('install', () => {
    console.info('install event!');
});

self.addEventListener('activate', evt => {
    console.info('activte event!');

    if (self.clients && self.clients.claim) {
        self.clients.claim();
    }


    setInterval(() => {console.log("I'm still alive");}, 3000);

});


