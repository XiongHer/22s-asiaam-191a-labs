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

const dataUrl= "https://docs.google.com/spreadsheets/d/e/2PACX-1vTTk10-kDr-nLH38AgMWkx6KCbePSyQamX3WHKsZDy-N4wRlAuYloD4dEsliqpd_3unE5eTQFuYSzM3/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => {console.log(results)}
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data.lat,data.lng,data["How was your graduate experiences so far at UCLA?"],data["How and where do you find academic and social support?"])
    })
}

loadData(dataUrl)

// const sampleDataArray = [[37,-122],[32,-118],[39,-119],[36,-120]]

// for (let i = 0; i < sampleDataArray.length; i++) {
//     console.log(i)
// }

// for(const dataInSample of sampleDataArray)
//     console.log('hello')

//     // console.log(dataInSample)

// const longString = 'hellooooooooooooo'
// const array1 = ['a', 'b', 'c'];

// // this loops through an array
// for (const stuff of array1){
//     console.log(stuff)
// }

// // this loops through a string!
// for (const letter in longstring){
//     console.log(letter)
// }

