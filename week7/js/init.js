// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

let graduatestudent = L.featureGroup();
let notgraduatestudent = L.featureGroup();

let layers = {
    "Graduate Student": graduatestudent,
    "Not Graduate Student": notgraduatestudent
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

const dataUrl= "https://docs.google.com/spreadsheets/d/e/2PACX-1vTTk10-kDr-nLH38AgMWkx6KCbePSyQamX3WHKsZDy-N4wRlAuYloD4dEsliqpd_3unE5eTQFuYSzM3/pub?output=csv"

// define the leaflet map
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
});
Esri_NatGeoWorldMap.addTo(map)

// add layer control box
L.control.layers(null,layers).addTo(map)

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

function addMarker(data){
    if(data['Are you a graduate student?'] == "Yes"){
        circleOptions.fillColor = "red"
        graduatestudent.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Graduate Student</h2>`))
        createButtons(data.lat,data.lng,data['Are you a graduate student?'])
        }
    else{
        circleOptions.fillColor = "blue"
        notgraduatestudent.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Not Graduate Student</h2>`))
        createButtons(data.lat,data.lng,data['Are you a graduate student?'])
    }
    return data
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    graduatestudent.addTo(map) // add our layers after markers have been made
    notgraduatestudent.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([graduatestudent,notgraduatestudent]);
    map.fitBounds(allLayers.getBounds());
}

loadData(dataUrl)
