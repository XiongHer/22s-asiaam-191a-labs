console.log('Hello Asian Am 191! :)');

// JavaScript const variable declaration
const map = L.map('the_map').setView([34.0709, -118.444], 5);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 

//JavaScript let variable declaration to create a marker
let marker = L.marker([34.0709, -118.444]).addTo(map) 
        .bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I work in ')
        .openPopup();
let marker2 = L.marker([37.865101, -119.538330]).addTo(map) 
        .bindPopup('Yosemite National Park<br> is where I want to visit ')
        .openPopup();

function add_market(lat,lng,popup){
    let marker = L.marker([lat, lng]).addTo(map) 
        .bindPopup(popup)
        .openPopup();
        //.openPopup();
}

