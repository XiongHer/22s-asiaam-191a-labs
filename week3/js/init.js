// let mapOptions={"mapCenter":[34.0709,-118.444], 
// "zoomLevel":5
// };

// declare the map
const map = L.map('the_map').setView([34.0709,-118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addMarker(37,-122,'home','home land!')
addMarker(32,-118,'work','where i work land!')
addMarker(39,-119,'location 1','random location')
addMarker(36,-120,'location 2','another random location')

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

console.log('')

fetch("map.geojson") 
    .then(function (data){
        return data.json()
    })
    .then(function (data){ 
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data).addTo(map)
    });

