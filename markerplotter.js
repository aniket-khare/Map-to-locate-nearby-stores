var xhr;
var storeData;
var storeMarkers = [];

const load = () => {
    xhr = new XMLHttpRequest();

    if(!xhr) {
        alert('Unable to create XHR Object');
        return false;
    }


    xhr.onreadystatechange = renderContent;
    xhr.open('GET', '../stores.json');
    xhr.send();

    function renderContent() {
        console.log(xhr.readyState);
        if(xhr.readyState === 4) {
            console.log('Received the data');
            if(xhr.status === 200){
            storeData = JSON.parse(xhr.responseText).storesFeatures;
            console.log(storeData);
        }
            else {
            console.log('Problem making AJAX request');
            }
        }

    }

}
window.onload = load;
window.addEventListener("load", () => {
    document.getElementById('radius').addEventListener('input',plotStores);
    document.getElementById('category').addEventListener('input',plotStores);
    
    
});

function getStores() {
    if (storeMarkers !== null){
        for(var point of storeMarkers) {
            point.remove();
        }
    }   
    
}

function plotStores() {
    if(storeData) {
        let radius = document.getElementById('radius').value;
        let categoryData = document.getElementById('category').value;
        for (const {name, description, coordinates, category} of storeData) {
            // using the getDistanceFromLatLonInkm function and storing it in variable
            let distance = getDistanceFromLatLonInKm(myPosition[1], myPosition[0], coordinates.lat, coordinates.lng);
            
            storeData.distance=distance;
            console.log(storeData.distance);
            console.log(myPosition[1],myPosition[0]);
            console.log(radius);
            if(distance < radius) {
                if(categoryData === category){
                const sl = document.createElement('div');
                sl.className = 'storeMarker';                    
                // make a marker for each feature and add it to the map
                console.log(coordinates);
                var oneMarker = new mapboxgl.Marker(sl)
                .setLngLat([coordinates.lng, coordinates.lat])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(`<h3>${name}</h3><p>${description}</p><p>${category}</p><p>Distance from current location - ${storeData.distance.toFixed(2)} km</p>`)

                ).addTo(map);
                storeMarkers.push(oneMarker);
                }
            }
        }
    }
}





