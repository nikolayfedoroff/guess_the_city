var map = L.map('map', {attributionControl: false}, {zoomSnap: 100}, {inertia: false}).setView([55.788631, 37.466790], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19}).addTo(map);

var circle = L.circle([51.508, -0.11], {
    color: 'green',
    fillColor: '#f03',
    fillOpacity: 1,
    radius: 500
}).addTo(map);