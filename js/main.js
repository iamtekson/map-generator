//map variable
var map = L.map('map').setView([38.8610, 71.2761], 8);

// tile layers
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//print function in map
L.control.browserPrint({
    title: 'Print current Layer',
    documentTitle: 'Tajikistan portal',
    printModes: [
        L.control.browserPrint.mode.landscape()
    ],
    manualMode: false,
    closePopupsOnPrint: true, //default value
}).addTo(map);

$.getJSON('data/jamoat.json', function (data) {
    console.log(data)
    new L.GeoJSON(data).addTo(map)
})
