
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: {
      lat: 41.85,
      lng: -87.65
    }
  });
  directionsDisplay.setMap(map);
  
  const start = document.getElementById('start');
  const end = document.getElementById('end');
  const way1 = document.getElementById('waypoints1');
  const way2 = document.getElementById('waypoints2');
  const way3 = document.getElementById('waypoints3');
  const way4 = document.getElementById('waypoints4');
  new google.maps.places.Autocomplete(start);
  new google.maps.places.Autocomplete(end);
  new google.maps.places.Autocomplete(way1);
  new google.maps.places.Autocomplete(way2);
  new google.maps.places.Autocomplete(way3);
  new google.maps.places.Autocomplete(way4);



  document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var waypts = [];
  var checkboxArray = document.getElementsByClassName('waypoints');
  for (var i = 0; i < checkboxArray.length; i++) {
    var address = checkboxArray[i].value;
    if (address !== '') {
      waypts.push({
        location: address,
        stopover: true
      });
    }
  }
  const selectedMode = document.getElementById("mode").value;

  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode[selectedMode],
  },  
function(response, status) {
  if (status === 'OK') {
    directionsDisplay.setDirections(response);
    var route = response.routes[0];
    var summaryPanel = document.getElementById('directions-panel');
    summaryPanel.innerHTML = '';
    // For each route, display summary information.
    for (var i = 0; i < route.legs.length; i++) {
      var routeSegment = i + 1;
      summaryPanel.innerHTML += '<b>Route level: ' + routeSegment +
        '</b><br>'; 
        
      summaryPanel.innerHTML +='From'+ ' :'+route.legs[i].start_address + '<br>'+' To :' 
      
      summaryPanel.innerHTML += route.legs[i].end_address + '<br><br>';
      summaryPanel.innerHTML += 'Distance in miles :' +route.legs[i].distance.text + '<br><br>';
      summaryPanel.innerHTML += 'Time :' +route.legs[i].duration.text + '<br><br><hr>';
    }
  } else {
    window.alert('Directions request failed due to ' + status);
  }
  }
  );
}

google.maps.event.addDomListener(window, "load", initMap);
