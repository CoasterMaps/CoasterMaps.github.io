var initialPositionX =0;
var initialPositionY = 0;
var initialZoom=0;

var lastZoom=8;
//var lastLat;
//var last

var savedPoint;
var globVar = 0;
      //savedPoint = projection;


function Events(inputMap, inputOverlay)
{
  this.googleMap = inputMap;
  this.overlay = inputOverlay;

	this.setListeners = function() {

     
		initialZoom = this.googleMap.getMap().getZoom();
     
		//this.initialPositionX = 0;
    //this.initialPositionY = 0;
    google.maps.event.addListener(globalMap, 'click', function(event) {
      //window.alert("hi0");
      //var projection = globalMap.getProjection();
      //savedPoint = projection.fromLatLngToPoint(this.point);
       
       // var initLatLong1 = globalMap.getCenter();            
      //  var pixelpointCenter = globalMap.getProjection().fromLatLngToPoint(initLatLong1);

      var mouseLocation = event.latLng;

       var numTiles = 1 << globalMap.getZoom();
       var worldCoordinate = globalMap.getProjection().fromLatLngToPoint(glovalMap.getCenter());

       var pixelCoordinate = new google.maps.Point(
        worldCoordinate.x * numTiles,
        worldCoordinate.y * numTiles);
  
       var tileCoordinate = new google.maps.Point(
        Math.floor(pixelCoordinate.x / 256),
        Math.floor(pixelCoordinate.y / 256));
 
 
       //window.alert("worldCoordinate: x="+worldCoordinate.x+" y="+worldCoordinate.y);
       //window.alert("pixelCoordinate: x="+pixelCoordinate.x+" y="+pixelCoordinate.y);
       window.alert("tileCoordinate: x="+tileCoordinate.x+" y="+tileCoordinate.y);


          //var LatiLongi = globalMap.getProjection().fromPointToLatLng(point);
     
    });



    google.maps.event.addListener(globalMap, 'zoom_changed', function(event){

//point = 

      

      // zoom level change
    
    //     blueHex.setRadius(blueHex.getRadius()*zoom/lastZoom);
      
       //window.alert("equals="+oldpixelX * pow(2,zoom) / pow(2,lastZoom));

       

      blueHex.setX(globalMap.getProjection().fromLatLngToPoint(worldpixelX));

      blueHex.setY(globalMap.getProjection().fromLatLngToPoint(worldpixelY));


       //savedPoint = globalMap.getProjection().fromLatLngToPoint(globalMap.getCenter());

       //lastZoom = zoom;

       //staticLayer.add(blueHex);
       //stage.add(staticLayer);*/
       //window.alert("layer scale = "+);

       if (globVar===0) {
          savedPoint = globalMap.getCenter();
          globVar=1;
       }
      
      worldpixelX = blueHex.getAbsolutePosition().x;
     


      //var mousepixelpoint =  globalMap.getCenter();

      //var LatiLongi = globalMap.getProjection().fromPointToLatLng(mousepixelpoint);

     //window.alert("diff lat=" + (savedPoint.lat()-mousepixelpoint.lat()) + " lng=" + (savedPoint.lng()-mousepixelpoint.lng()) );

   //   savedPoint = mousepixelpoint;

       window.alert("hi");

      var container = document.getElementById('container');
      window.alert("left=" + $(container).offset().left + " top=" + $(container).offset().top + " right=" + $(container).offset().right);

       var map = document.getElementById('map-canvas');
      window.alert("left=" + $(map).offset().left + " top=" + $(map).offset().top + " right=" + $(map).offset().right);


       //var map = document.getElementById('map-canvas');
     // window.alert(map.style.top.toString());



       //blueHex.setX(worldpixelX*Math.pow(2,zoom));
       //blueHex.setY(worldpixelY*Math.pow(2,zoom));
      // staticLayer.add(blueHex);
       //stage.add(staticLayer);

/*try with layers

       var zoomAmount =  Math.pow(2,zoom)/Math.pow(2,lastZoom);

          // window.alert("layer scale = "+staticLayer.getScale().x);
          staticLayer.scaleX(staticLayer.scaleX()*zoomAmount);
          staticLayer.scaleY(staticLayer.scaleY()*zoomAmount);
      

       lastZoom=zoom;
       //staticLayer.draw();
       stage.add(staticLayer);
      //  window.alert("layer scale = "+staticLayer.getScale().x);

      */

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
