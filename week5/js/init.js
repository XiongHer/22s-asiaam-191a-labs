// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

const dataUrl= "https://docs.google.com/spreadsheets/d/e/2PACX-1vT0cUDc60RnZpw2in8WgzFq-TNyZvyVQRJmI8lSh4DrONr3SQXQ_DgHK4u_yzPV1SfLutmeNUZ2IEU6/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: function(results) {
            console.log(results)
        }
    })
}


// we will this later
loadData(dataUrl)