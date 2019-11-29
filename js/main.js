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


//get Geojson Locally
// $.getJSON('data/jamoat.json', function (data) {
//     console.log(data)
//     new L.GeoJSON(data).addTo(map)
// })


url = "http://localhost:8080/geoserver/generateMap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=generateMap%3Ajamoat&maxFeatures=50&outputFormat=application%2Fjson"
// ajax request handler 
function handleAjax() {
    //Geoserver Web Feature Service
    $.ajax('http://localhost:8080/geoserver/wfs', {
        type: 'GET',
        data: {
            service: 'WFS',
            version: '1.1.0',
            request: 'GetFeature',
            typename: 'generateMap:jamoat',
            CQL_FILTER: `jamoat='Bobojon_Ghafurov_Chshmasor'`,
            srsname: 'EPSG:4326',
            outputFormat: 'text/javascript',
        },
        dataType: 'jsonp',
        jsonpCallback: 'callback:handleJson',
        jsonp: 'format_options'
    });
    console.log(data)
}

// the ajax callback function
function handleJson(data) {
    selectedArea = L.geoJson(data).addTo(map);
    map.fitBounds(selectedArea.getBounds());
}
handleAjax()