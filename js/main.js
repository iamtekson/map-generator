//map variable
var map = L.map('map').setView([38.8610, 71.2761], 8);

// tile layers
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const mywms = L.tileLayer.wms("http://localhost:8080/geoserver/generateMap/wms", {
    layers: 'generateMap:jamoat',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: "country layer"
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

district = $('#select01').val()
$('#select01').change(function () {
    district = $(this).val();
    console.log(district)
})

// ajax request handler 
function handleAjax(value) {
    //Geoserver Web Feature Service
    $.ajax('http://localhost:8080/geoserver/wfs', {
        type: 'GET',
        data: {
            service: 'WFS',
            version: '1.1.0',
            request: 'GetFeature',
            typename: 'generateMap:jamoat',
            CQL_FILTER: `district='${value}'`,
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
    selectedArea = L.geoJson(data, {
        style: function (feature) {
            attr = feature.properties.JAMOAT
            return {
                color: 'black',
                fillColor: getRandomColor(),
                fillOpacity: '0.91'
            }
        }
    }).addTo(map);
    map.fitBounds(selectedArea.getBounds());
}
$('#select01').change(function () {
    map.eachLayer(function (layer) {
        map.removeLayer(layer)
    });
    map.addLayer(mywms)
    handleAjax(district)
})

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Jamoats</strong>'],
        categories = ['jd', 'dfj', 'dskjf', 'dsjf', 'sdfjl', 'dsjf']

    for (var i = 0; i < categories.length; i++) {
        div.innerHTML += labels.push('<i style="background:' + getRandomColor(categories[i]) + '"></i>' + (categories[i] ? categories[i] : '+'));
    }
    div.innerHTML = labels.join('<br>')
    return div;
};

legend.addTo(map);

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}