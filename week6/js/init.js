// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(data){
    console.log(data)
    L.marker([data.lat,data.lng]).addTo(map).bindPopup(`<h2> <h3>Is English your first langage? ${data.Location}</h2> <h3>${data.OpenEnded}</h3>`)
    createButtons(data)
    return 
}

function createButtons(data){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+data.Location; // gives the button a unique id
    newButton.innerHTML = data.Location; // gives the button a title
    newButton.setAttribute("lat",data.lat); // sets the latitude 
    newButton.setAttribute("lng",data.lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([data.lat,data.lng]); //this is the flyTo from Leaflet
    })
    document.body.appendChild(newButton); //this adds the button to our page.
    const placeForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS2WyfKTyZJ-_ja3GGrxoAXwranavyDGXYsxeFUO4nvHpCJrkKhChymXQqUEyhdGLnz9VN6BJv5tOjp/pub?gid=1560504149&single=true&output=csv"

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
}

loadData(dataUrl)
