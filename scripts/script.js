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
let markers = [];

// map init

let mapOptions = {
    attributionControl: false,
    zoomSnap: 1
};

let map = L.map('map', mapOptions).setView([55.788631, 37.466790], 3);

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

function addCommonTitle(name, distance, idx) {
    let label = {
        element: document.createElement('div'),
        distance: distance,
        name: name
    }

    let textInLabel = document.createElement('div');
    textInLabel.classList.add('text_in_label');

    let nameInLabel = document.createElement('div');
    let distInLabel = document.createElement('div');

    distInLabel.classList.add('dist-in-label');

    nameInLabel.innerHTML = name;
    distInLabel.innerHTML = distance.toFixed(2);

    textInLabel.appendChild(nameInLabel);
    textInLabel.appendChild(distInLabel);

    let blockInLabel = document.createElement('div');
    blockInLabel.classList.add('block_in_label');
    blockInLabel.style.width = `max(5vh, calc(25vw * ${(1 - distance / maxDistance) ** 3}))`;

    markers.push(L.circle(L.latLng(data[idx].geo_lat, data[idx].geo_lon)));

    if (distance <= 1000) {
        blockInLabel.style.backgroundColor = 'green';
        markers[markers.length - 1].setStyle({color: 'green'});
    
    } else if (distance <= 2500) {
        blockInLabel.style.backgroundColor = 'yellow';
        markers[markers.length - 1].setStyle({color: 'yellow'});
    } else {
        blockInLabel.style.backgroundColor = 'red';
        markers[markers.length - 1].setStyle({color: 'red'});
    }

    markers[markers.length - 1].setStyle({fillOpacity: 1});
    markers[markers.length - 1].addTo(map);

    label.element.appendChild(textInLabel);
    label.element.appendChild(blockInLabel);
    label.element.classList.add('label');

    hideTitles();
    labels.push(Object.create(label));
    labels.sort(compare);
    showTitles();
}

function processInput() {
    if (document.getElementById('input-block-field').classList.contains('error')) {
        document.getElementById('input-block-field').classList.remove('error');
    }

    let text = document.getElementById('input').value.trim();

    let idx = -1;
    for (let i = 0; i < curLevelIndexes.length; i++) {
        if (text.toLowerCase() == data[curLevelIndexes[i]].name.toLowerCase()) {
            idx = curLevelIndexes[i];
        }
    }

    if (idx == -1) {
        document.getElementById('input-block-field').classList.add('error');
    } else {
        let flag = false;
        for (let i = 0; i < labels.length; i++) {
            if (labels[i].name == data[idx].name) {
                flag = true;
            }
        }
        if (flag) {
            document.getElementById('input-block-field').classList.add('error');
            document.getElementById('input').value = '';
            return;
        }
        let distance = getDistance(L.latLng(data[curLevelIndexes[curCityIndex]].geo_lat, data[curLevelIndexes[curCityIndex]].geo_lon), L.latLng(data[idx].geo_lat, data[idx].geo_lon));
        addCommonTitle(data[idx].name, distance, idx);
        if (distance < 0.001) {
            alert('Верно');
        }
        document.getElementById('input').value = '';
    }
}

document.getElementById('input').oninput = function() {
    if (document.getElementById('input-block-field').classList.contains('error')) {
        document.getElementById('input-block-field').classList.remove('error');
    }
}

let enterButton = document.getElementById('input-block-button');
enterButton.addEventListener('click', processInput);

let input = document.getElementById('input');
input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('input-block-button').click();
    }
});

function clear() {
    hideTitles();
    labels = [];
    for (let i = 0; i < markers.length; i++) {
        markers[i].removeFrom(map);
    }
    markers = [];
}

function changeLevelToLevel1() {
    clear();

    curLevelIndexes = level1Indexes;
    curCityIndex = getRandomInt(curLevelIndexes.length);
}

function changeLevelToLevel2() {
    clear();

    curLevelIndexes = level2Indexes;
    curCityIndex = getRandomInt(curLevelIndexes.length);
}

function changeLevelToLevel3() {
    clear();

    curLevelIndexes = level3Indexes;
    curCityIndex = getRandomInt(curLevelIndexes.length);
}

document.getElementById('level1').addEventListener('click', changeLevelToLevel1);
document.getElementById('level2').addEventListener('click', changeLevelToLevel2);
document.getElementById('level3').addEventListener('click', changeLevelToLevel3);

function clearMap() {
    document.getElementById('view-button').classList.remove('hidden');
    document.getElementById('view-hide-button').classList.add('hidden');

    document.getElementById('map').style.filter = 'blur(0px)';
}

function blurMap() {
    document.getElementById('view-hide-button').classList.remove('hidden');
    document.getElementById('view-button').classList.add('hidden');

    document.getElementById('map').style.filter = 'blur(7px)';
}

document.getElementById('view-button').addEventListener('click', blurMap);
document.getElementById('view-hide-button').addEventListener('click', clearMap);



