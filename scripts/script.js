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

let maxDistance = 0;

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
        maxDistance = Math.max(maxDistance, getDistance(L.latLng(data[i].geo_lat, data[i].geo_lon), L.latLng(data[j].geo_lat, data[j].geo_lon)));
    }
}

function getRandomInt(n) {
    return Math.floor(Math.random() * n);
}


// initial state

let curLevelIndexes = level1Indexes;
let curCityIndex = getRandomInt(curLevelIndexes.length);
let labels = [];


// map init

let mapOptions = {
    attributionControl: false,
    zoomSnap: 1
};

let map = L.map('map', mapOptions).setView([55.788631, 37.466790], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);


// labels

function compare(a, b) {
    if (a.distance < b.distance) {
        return -1;
    }
    if (a.distance > b.distance) {
        return 1;
    }
    return 0;
}

function showTitles() {
    for (let i = 0; i < labels.length; i++) {
        let labelsBlock = document.getElementById('labels');
        labelsBlock.appendChild(labels[i].element);
    }
}

function hideTitles() {
    for (let i = 0; i < labels.length; i++) {
        let labelsBlock = document.getElementById('labels');
        labelsBlock.removeChild(labels[i].element);
    }
}

function addCommonTitle(name, distance) {
    let label = { 
        element: document.createElement('div'),
        distance: distance,
        name: name
    }

    let textInLabel = document.createElement('div');
    textInLabel.classList.add('text_in_label');
    textInLabel.innerHTML = name;

    let blockInLabel = document.createElement('div');
    blockInLabel.classList.add('block_in_label');
    blockInLabel.style.width = `max(40px, calc(25vw * ${(1 - distance / maxDistance) ** 3}))`;

    if (distance <= 1000) {
        blockInLabel.style.backgroundColor = '#00FE0D';
    } else if (distance <= 2500) {
        blockInLabel.style.backgroundColor = 'yellow';
    } else {
        blockInLabel.style.backgroundColor = 'red';
    }

    label.element.appendChild(textInLabel);
    label.element.appendChild(blockInLabel);
    label.element.classList.add('label');

    hideTitles();
    labels.push(Object.create(label));
    labels.sort(compare);
    showTitles();
}

addCommonTitle('Тюмень', 0);
addCommonTitle('Саратов', 20);
addCommonTitle('Самара', 10000);
addCommonTitle('Москва', 10001);
addCommonTitle('Санкт-Петербург', 701);
addCommonTitle('Ханты-Мансийск', 1001);
addCommonTitle('Троицк', 2501);