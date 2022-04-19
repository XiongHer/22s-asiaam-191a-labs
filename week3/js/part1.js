// declare the map
const map = L.map('the_map').setView([34.0709,-118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

addMarker(43.038902,-87.906471,'Hometown','Milwaukee, WI')
addMarker(46.7208,-92.1041,'Work','Superior, WI')
addMarker(38.9072,-77.0369,'Internship','Washington D.C')
addMarker(39.9042,116.4074,'Study Abroad','Beijing, China')
addMarker(13.7563,100.5018,'Work Abroad','Bangkok, Thailand')

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat, lng, title);
    return message
}

function createButtons(latitude, longitude, title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title;
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",latitude); 
    newButton.setAttribute("lng",longitude); 
    newButton.addEventListener('click', function(){
        map.flyTo([latitude,longitude]); 
    })
    document.getElementById("contents").appendChild(newButton);
}