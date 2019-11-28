//map variable
var map = L.map('map').setView([51.505, -0.09], 13);

// tile layers
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//print function in map
L.control.browserPrint({
    title: 'Print current Layer',
    documentTitle: 'Utility Management System',
    printModes: [
        L.control.browserPrint.mode.landscape("Tabloid VIEW", "Tabloid"),
        L.control.browserPrint.mode.landscape(),
        "PORTrait",
        L.control.browserPrint.mode.auto("Auto", "B4"),
        L.control.browserPrint.mode.custom("Selected area", "B5")
    ],
    manualMode: false,
    closePopupsOnPrint: true, //default value
}).addTo(map);

L.geoJSON('data/data').addTo(map)