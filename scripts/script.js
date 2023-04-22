let level1Indexes = []
let level2Indexes = []
let level3Indexes = []

for (let i = 0; i < data.length; i++) {
    if (data[i].capital_marker) {
        level1Indexes.push(i);
    }
    if (data[i].population >= 50000) {
        level2Indexes.push(i);
    }
    level3Indexes.push(i);
}

function getDistance(from, to) {
    return from.distanceTo(to) / 1000;
}

let maxLength = 0;

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
        maxLength = Math.max(maxLength, getDistance(L.latLng(data[i].geo_lat, data[i].geo_lon), L.latLng(data[j].geo_lat, data[j].geo_lon)));
    }
}

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}


// initial state

let curLevelIndexes = level1Indexes;
let curCityIndex = getRandomInt(curLevelIndexes.length);


// map init

let mapOptions = {
    attributionControl: false,
    zoomSnap: 1
};

let map = L.map('map', mapOptions).setView([55.788631, 37.466790], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);