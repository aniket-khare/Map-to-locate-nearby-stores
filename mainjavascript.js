mapboxgl.accessToken = 'pk.eyJ1IjoieWFkdXZhbnNoaWFua3VyMiIsImEiOiJja3RicWI3a2gxeWEzMm9xbHA3aXV2ZnNlIn0.XeP7g-Med4OGHYON9FdWCw';
var myPosition = [];

var map;
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, 
    {enableHighAccuracy: true})
    
function successLocation(position) {
    myPosition = [position.coords.longitude,position.coords.latitude];
    console.log(myPosition)
    setupMap(myPosition);
}

function errorLocation (){
  alert('not able to access geolocation');
};

function setupMap (center) {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: center,
        zoom:15
    })
    map.addControl (new mapboxgl.GeolocateControl({
        positionOptions: {
        enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
        }),
    )

    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)    
    
    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
        
      });
      
      
      map.addControl(directions, 'top-left');
     
}
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  