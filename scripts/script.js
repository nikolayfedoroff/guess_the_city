var map = L.map('map', {
    attributionControl: false
}, {
    zoomSnap: 100
}).setView([55.788631, 37.466790], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);