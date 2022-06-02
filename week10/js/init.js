// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5};

let englishFirst = L.featureGroup();
let nonEnglishFirst = L.featureGroup();

const englishFirstLegendHTML = document.getElementById("englishCheckbox");
const nonEnglishFirstLegendHtml = document.getElementById("nonEnglishCheckbox");

//this is the map legend
let layers = {
    "English as First Language <svg height='10' width='10'><circle cx='5' cy='5' r='4' stroke='black' stroke-width='1' fill='red' /></svg>": englishFirst,
    "Non-English as First Language <svg height='10' width='10'><circle cx='5' cy='5' r='4' stroke='black' stroke-width='1' fill='blue' /></svg>": nonEnglishFirst
}


let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2WyfKTyZJ-_ja3GGrxoAXwranavyDGXYsxeFUO4nvHpCJrkKhChymXQqUEyhdGLnz9VN6BJv5tOjp/pub?gid=1560504149&single=true&output=csv";

const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map);

// // add layer control box
// L.control.layers(null,layers,{collapsed:false}).addTo(map);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

function addMarker(data){
    if(data['Is your English your first language?'] == "Yes"){
        circleOptions.fillColor = "red"
        englishFirst.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>English First Language</h2>`))
        createButtons(data.lat,data.lng,data.Location)
        }
    else{
        circleOptions.fillColor = "blue"
        nonEnglishFirst.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Non-English First Language</h2>`))
        createButtons(data.lat,data.lng,data.Location)
    }
    return data
};

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
};

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
};

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    englishFirst.addTo(map) // add our layers after markers have been made
    nonEnglishFirst.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([englishFirst,nonEnglishFirst]);
    map.fitBounds(allLayers.getBounds());
};

loadData(dataUrl)

// toggle the legend for englishFirstLegend grouplayer
englishFirstLegendHTML.addEventListener("click",toggleEnglishLayer) 

function toggleEnglishLayer(){
    if(map.hasLayer(englishFirst)){
        map.removeLayer(englishFirst)
    }
    else{
        map.addLayer(englishFirst)
    }
}

// toggle the legend for nonEnglishFirstLegend grouplayer
nonEnglishFirstLegendHtml.addEventListener("click",toggleNonEnglishLayer) 

function toggleNonEnglishLayer(){
    if(map.hasLayer(nonEnglishFirst)){
        map.removeLayer(nonEnglishFirst)
    }
    else{
        map.addLayer(nonEnglishFirst)
    }
}