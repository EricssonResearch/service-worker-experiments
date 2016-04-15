'use strict';

const resourceLabels = {};
let resourceMap;
let image;

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./service_worker.js').then(reg => {
        console.info(`Registration succeeded for ${reg.scope}`);
    })
    .catch(error => {
        console.error(`Registration failed: ${error}`);
    });
}

function showImage(evt) {
    evt.preventDefault();
    image.src = evt.target.href;
}

function setupServiceWorkerCommunication(prefetchMap) {
    const serviceWorker = navigator.serviceWorker.controller;
    if (!serviceWorker) {
        return;
    }

    const channel = new MessageChannel();
    channel.port1.onmessage = evt => {
        console.log("go dat from SW");
    };
    serviceWorker.postMessage({ prefetch: prefetchMap }, [channel.port2]);
}

document.addEventListener('DOMContentLoaded', () => {
    console.info(`controller: ${navigator.serviceWorker.controller}`);

    image = document.querySelector('#image');

    resourceMap = {
        avicii2: ['../resources/avicii2.jpeg'],
        bbb: ['../resources/bbb.png'],
        bg_small: ['../resources/bg_small.jpg'],
        falun2: ['../resources/falun2.jpeg'],
        movies: ['../resources/sintel2.jpg', '../resources/spectre2.jpeg',
        '../resources/glass-empty.jpg', '../resources/glass-half-full.jpg'],
        dashData: ['../resources/vod_md_hd_1_4_5_1_P.mp4'].
            concat([1, 2, 3, 4, 5, 6].map(num => `../resources/seg-0000${num}_P.m4v`)),
    };

    const prefetchList = [
        'bbb',
        'movies',
        'dashData',
    ];

    const linksDiv = document.querySelector('#links');

    Object.keys(resourceMap).forEach(resourceName => {
        const label = document.createElement('span');
        label.textContent = resourceName;
        resourceLabels[resourceName] = label;
        linksDiv.appendChild(label);
        linksDiv.appendChild(document.createTextNode(': '));

        resourceMap[resourceName].forEach(resource => {
            const a = document.createElement('a');
            a.href = resource;
            a.onclick = showImage;
            a.textContent = resource.substr(resource.lastIndexOf('/') + 1);

            linksDiv.appendChild(a);
            linksDiv.appendChild(document.createTextNode(' '));
        });

        linksDiv.appendChild(document.createElement('br'));
    });

    const prefetchMap = {};
    prefetchList.forEach(resourceName => {
        prefetchMap[resourceName] = resourceMap[resourceName];
    });

    console.info(`prefetch: ${Object.keys(prefetchMap).join()}`);
    sendPrefetchMapToServiceWorker(prefetchMap);
});
