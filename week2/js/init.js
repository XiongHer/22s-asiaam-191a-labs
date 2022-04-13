console.log('Hello Asian Am 191! :)');

// JavaScript const variable declaration
const map = L.map('the_map').setView([34.0709, -118.444], 4);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 

//JavaScript let variable declaration to create a marker
// let marker = L.circleMarker([44.427963, -110.588455]).addTo(map) 
//         .bindPopup('Yellow Stone National Park<br> Visited in 2016')
//         .openPopup();
// let marker2 = L.circleMarker([43.714940, -102.548650]).addTo(map) 
//         .bindPopup('Badland National Park<br> Visited in 2016 ')
//         .openPopup();

function add_marker(lat,lng,popup){
    let marker = L.circleMarker([lat, lng]).addTo(map) 
        .bindPopup(popup)
        .openPopup();
        //.openPopup();
}

add_marker(37.620720,-105.745941, "Great Sand Dunes National Park <br> Visited in 2016 <img src='./photos/greatsanddunes.jpeg' class='myimages'></img>")
add_marker(35.965000,-111.973793, "Grand Canyon National Park<br> Visited in 2021 <img src='./photos/7.jpeg' class='myimages'></img>")
add_marker(38.889271,-77.050179, "Lincoln Memorial<br> Visited in 2017,18, & 20 <img src='./photos/alm.jpg' class='myimages'></img>")
add_marker(41.213181,-124.004623, "Redwood National & State Parks<br> Visited in 2021 <img src='./photos/redwood.jpeg' class='myimages'></img>")
add_marker(44.427963, -110.588455, "Yellowstone National Park<br>Visited in 2016 <img src='./photos/ysp.jpg' class='myimages'></img>")
add_marker(43.714940, -102.548650, "Badland National Park<br>Visited in 2016 <img src='./photos/blp.jpg' class='myimages'></img>")

// var imageUrl ='https://www.doi.gov/sites/doi.gov/files/uploads/great-sand-dunes-np-nps-patrick-meyers-elk-and-star-dunes_0.jpg', 
// imageBounds = [[37.620720,-105.745941],[37.620720,-105.745941]]
// L.imageOverlay(imageUrl).addTo(map); 
// this is for overlapping an image on top of another