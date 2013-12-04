function GoogleListeners(inputGMap) {

	this.gmap = inputGMap;

  //window.alert("hi");

  this.initListeners = function() {

    var gmap=this.gmap;

    var center_changed = google.maps.event.addListener(gmap, 'center_changed', function(e) {

      var centerCoord = gmap.getCenter();
      var zoom = gmap.getZoom();
      myLocalStorage.saveGMapToLocalStorage(centerCoord.lat(), centerCoord.lng(), zoom);
    });

    var zoom_changed = google.maps.event.addListener(this.gmap, 'zoom_changed', function(e) {
      
      var centerCoord = gmap.getCenter();
      var zoom = gmap.getZoom();
      myLocalStorage.saveGMapToLocalStorage(centerCoord.lat(), centerCoord.lng(), zoom);
    });
  }



  this.tagListener = function(){

    var gmap=this.gmap;
   
    google.maps.event.clearListeners(gmap, 'click');
    google.maps.event.addListener(gmap,'click', function(event){ 

        var drawTag = new DrawTag(gmap);
        drawTag.onGMap(event.latLng);

    });

  }


  this.lineListener = function(){

    var gmap=this.gmap;

    var polyOptions2 = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 3,
    fillColor: 'FF0000',
    fillOpacity: 0.35        
    };        

  var poly = new google.maps.Polygon(polyOptions2);
  poly.setMap(gmap);   

  google.maps.event.clearListeners(gmap, 'click');
  google.maps.event.addListener(gmap,'click', function(event){
    
    var drawLine = new DrawLine(gmap);
    drawLine.onGMap(event.latLng,poly);
  });

  }





}



