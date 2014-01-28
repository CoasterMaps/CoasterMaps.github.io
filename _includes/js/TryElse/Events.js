var initialPositionX =0;
var initialPositionY = 0;
var initialZoom=0;

var lastZoom=8;
//var lastLat;
//var last

var savedPoint;
var globVar = 0;
      //savedPoint = projection;


var geoLocationSaved;

function zoomIn() {
  globalMap.setZoom(globalMap.getZoom()+1);
}
function zoomOut() {
  globalMap.setZoom(globalMap.getZoom()-1);
}
    function fromLatLngToPoint(latLng, map) {
    
      var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
      var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
      var scale = Math.pow(2, map.getZoom());
      var worldPoint = map.getProjection().fromLatLngToPoint(latLng);

      return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
    }

    function fromPointToLatLng(point, map) {

      var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
      var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
      var scale = Math.pow(2, map.getZoom());
      
      var worldPoint = map.getProjection().fromPointToLatLng(
        new google.maps.Point(Math.floor(point.x/scale+bottomLeft.x), Math.floor(point.y/scale+topRight.y)));


      return worldPoint;
    }


function Events(inputMap, inputOverlay)
{
  this.googleMap = inputMap;
  this.overlay = inputOverlay;

	this.setListeners = function() {

     
		initialZoom = this.googleMap.getMap().getZoom();
     
		//this.initialPositionX = 0;
    //this.initialPositionY = 0;




google.maps.event.addListenerOnce(globalMap, 'idle', function(){
  

  var currentHexPoint = new google.maps.Point(blueHex.getAbsolutePosition().x, blueHex.getAbsolutePosition().y);


  var hexGeo = fromPointToLatLng(currentHexPoint, globalMap);
  geoLocationSaved = hexGeo;

  initialZoom = globalMap.getZoom();
  //window.alert("lat=" + hexGeo.lat() + "long=" + hexGeo.lng());

});





    google.maps.event.addListener(globalMap, 'click', function(event) {
      

      var mouseLocation = event.latLng;

      var northEastCoord = globalMap.getBounds().getNorthEast();
      var southWestCoord = globalMap.getBounds().getSouthWest();

      var northEastPoint = globalMap.getProjection().fromLatLngToPoint(northEastCoord);
      var southWestPoint = globalMap.getProjection().fromLatLngToPoint(southWestCoord);

      var actualpixelMouse = fromLatLngToPoint(mouseLocation, globalMap);
 
      window.alert("worldCoordinate: x="+Math.floor(actualpixelMouse.x)+" y="+Math.floor(actualpixelMouse.y));

       //blueHex.setAbsolutePosition(Math.floor(actualpixelMouse.x));

      blueHex.x(Math.floor(actualpixelMouse.x));
      blueHex.y(Math.floor(actualpixelMouse.y));
       

      staticLayer.add(blueHex);
      stage.add(staticLayer);

    });






    google.maps.event.addListener(globalMap, 'zoom_changed', function(event){
     

      var actualpixelMouse = fromLatLngToPoint(geoLocationSaved, globalMap);
 

      blueHex.x(Math.floor(actualpixelMouse.x));
      blueHex.y(Math.floor(actualpixelMouse.y));


      blueHex.setRadius(blueHex.getRadius()*(Math.pow(2,globalMap.getZoom()) / Math.pow(2,initialZoom) ));
      //else blueHex.setRadius(blueHex.getRadius()*globalMap.getZoom());
      //if (initialZoom>globalMap.getZoom())


      initialZoom = globalMap.getZoom();

       

      staticLayer.add(blueHex);
      stage.add(staticLayer);
          

      //blueHex.setX(globalMap.getProjection().fromLatLngToPoint(worldpixelX));

      //blueHex.setY(globalMap.getProjection().fromLatLngToPoint(worldpixelY));



     //  if (globVar===0) {
     //     savedPoint = globalMap.getCenter();
     //     globVar=1;
     //  }
      
      //worldpixelX = blueHex.getAbsolutePosition().x;
     

      //window.alert("hi");

      //var container = document.getElementById('container');
      //window.alert("left=" + $(container).offset().left + " top=" + $(container).offset().top + " right=" + $(container).offset().right);

       //var map = document.getElementById('map-canvas');
      //window.alert("left=" + $(map).offset().left + " top=" + $(map).offset().top + " right=" + $(map).offset().right);


      // window.alert("lat=" +geoLocationSaved.lat() + "long=" + geoLocationSaved.lng());


    });



        
     
    this.overlay.getStage().getContent().addEventListener('mousedown', function(event){
         
        initialPositionX = event.clientX;
        initialPositionY = event.clientY;
    });
     

    this.overlay.getStage().getContent().addEventListener('mouseup', function(event){

        initialPositionX = 0;
        initialPositionY = 0;
    });

    
		
    this.overlay.getStage().getContent().addEventListener('mousemove', function(event){ 

      
          var zoom = globalMap.getZoom();

          var mousePositionX = (event.clientX+60) / Math.pow(2,zoom);
          var mousePositionY = event.clientY / Math.pow(2,zoom);


          var initLatLong1 = globalMap.getCenter();            
          var pixelpointCenter = globalMap.getProjection().fromLatLngToPoint(initLatLong1);
          
          //pixelpoint.x = pixelpoint.x + (initialPositionX - finalPositionX) / Math.pow(2,zoom);   

          var point = new google.maps.Point((event.clientX+60)/Math.pow(2,zoom), event.clientY/Math.pow(2,zoom));

          //window.alert("center.x="+pixelpointCenter.x+" center.y="+pixelpointCenter.y+" point.x="+point.x+" point.y="+point.y);    


          var LatiLongi = globalMap.getProjection().fromPointToLatLng(point);

         //window.alert("centerlat="+initLatLong1.lat()+" centerlng="+initLatLong1.lng()+" mouselat="+LatiLongi.lat()+" mouselng="+LatiLongi.lng());


     

       if ((initialPositionX !== 0) && (initialPositionY !== 0)){

          var finalPositionX = event.clientX;
          var finalPositionY = event.clientY;
            
          var initLatLong = globalMap.getCenter();
            
          var pixelpoint = globalMap.getProjection().fromLatLngToPoint(initLatLong);
          var zoom = globalMap.getZoom();

            
          pixelpoint.x = pixelpoint.x + (initialPositionX - finalPositionX) / Math.pow(2,zoom);
          pixelpoint.y = pixelpoint.y + (initialPositionY - finalPositionY) / Math.pow(2,zoom);

          var newpoint = globalMap.getProjection().fromPointToLatLng(pixelpoint);
           
          globalMap.setCenter(newpoint);

          initialPositionX = finalPositionX;
          initialPositionY = finalPositionY;  

        }

    }); 

	}


	
}
