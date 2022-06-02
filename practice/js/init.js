// declare variables
let mapOptions = {'center': [34.037811,-118.432305],'zoom':25}

let HigherEducationOrganizationalChange = L.markerClusterGroup();
let SocialSciencesComparativeEducation = L.markerClusterGroup();
let HumanDevelopmentPsychology = L.markerClusterGroup();
let UrbanSchooling = L.markerClusterGroup();

//declare map
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);


//define layers

let layers = {
    "Higher Education and Organizational Change": HigherEducationOrganizationalChange,
    "Social Science and Comparative Education": SocialSciencesComparativeEducation,
    "Human Development and Psychology": HumanDevelopmentPsychology,
    "Urban Schooling": UrbanSchooling
};

//add layers to control box
L.control.layers(null,layers).addTo(map);

let circleOptions = {
    radius: 15,
    fillColor: "#ff7800",
    color: "#000",
    weight: 3,
    opacity: .05,
    fillOpacity: 0.4
};

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRY-L6A716JujwHfSOCDzWLf6kGSy9FGNdfoj37Lwccx30dVCaHzkPKhC8Si3vaGag91rTGMOhgNMhg/pub?output=csv"


function addMarker(data){
    if(data['Graduate Program in SEIS:'] == "Higher Education and Organizational Change"){
        circleOptions.fillColor = "red"
        HigherEducationOrganizationalChange.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).
        bindPopup(`<h3>${data['Please let us know what pseudonym you would like to be called in place of your first name when your information is posted on the map. We ask for pseudonyms to prioritize privacy.']}</h3></br>
        ${data['How do you define "community", "support", and "self-care" within your graduate school experience?']}</br></br>
        ${data['What helps you find support and community in grad school?']}</br></br>
        ${data['Please describe how you practice self-care as a graduate student:']}`))  
        createButtons(data.lat,data.lng,data['Please let us know what pseudonym you would like to be called in place of your first name when your information is posted on the map. We ask for pseudonyms to prioritize privacy.'])
        }
    if(data['Graduate Program in SEIS:'] == "Social Sciences & Comparative Education"){
        circleOptions.fillColor = "blue"
        SocialSciencesComparativeEducation.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).
        bindPopup(`<h3>${data['Please let us know what pseudonym you would like to be called in place of your first name when your information is posted on the map. We ask for pseudonyms to prioritize privacy.']}</h3></br>
        ${data['How do you define "community", "support", and "self-care" within your graduate school experience?']}</br></br>
        ${data['What helps you find support and community in grad school?']}</br></br>
        ${data['Please describe how you practice self-care as a graduate student:']}`))  
        createButtons(data.lat,data.lng,data['Please let us know what pseudonym you would like to be called in place of your first name when your information is posted on the map. We ask for pseudonyms to prioritize privacy.'])
        }
    if(data['Graduate Program in SEIS:'] == "Human Development and Psychology"){
        circleOptions.fillColor = "green"
        HumanDevelopmentPsychology.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).
        bindPopup(`<h3>${data['Please let us know what pseudonym you would like to be called in place of your first name when your information is posted on the map. We ask for pseudonyms to prioritize privacy.']}</h3></br>
        ${data['How do you define "community", "support", and "self-care" within your graduate school experience?']}</br></br>
        ${data['What helps you find support and community in grad school?']}</br></br>
        ${data['Please describe how you practice self-care as a graduate student:']}`))  
        createButtons(data.lat,data.lng,data['Please let us know what pseudonym you would like to be called in place of your first name when your information is posted on the map. We ask for pseudonyms to prioritize privacy.'])
        }
    if(data['Graduate Program in SEIS:'] == "Urban Schooling"){
        circleOptions.fillColor = "purple"
        UrbanSchooling.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).
        bindPopup(`<h3>${data['Please let us know what pseudonym you would like to be called in place of your first name when your information is posted on the map. We ask for pseudonyms to prioritize privacy.']}</h3></br>
        ${data['How do you define "community", "support", and "self-care" within your graduate school experience?']}</br></br>
        ${data['What helps you find support and community in grad school?']}</br></br>
        ${data['Please describe how you practice self-care as a graduate student:']}`))  
        createButtons(data.lat,data.lng,data['Please let us know what pseudonym you would like to be called in place of your first name when your information is posted on the map. We ask for pseudonyms to prioritize privacy.'])
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
    HigherEducationOrganizationalChange.addTo(map) // add our layers after markers have been made
    SocialSciencesComparativeEducation.addTo(map) // add our layers after markers have been made  
    HumanDevelopmentPsychology.addTo(map) // add our layers after markers have been made
    UrbanSchooling.addTo(map) // add our layers after markers have been made  

let allLayers = L.featureGroup([HigherEducationOrganizationalChange,SocialSciencesComparativeEducation,HumanDevelopmentPsychology,UrbanSchooling]);
map.fitBounds(allLayers.getBounds());
};

loadData(dataUrl)
