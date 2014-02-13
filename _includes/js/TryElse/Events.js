var initialZoom=0;

var mapLayerState = new MapLayerState();

var line = 0;
var annot = 0;



function Events(inputMap, inputOverlay)
{

  this.googleMap = inputMap;
  this.overlay = inputOverlay;
 
$("#cancel-tool").click(function(){
    annot=0;
    line=0;
});

$("#line-tool").click(function(){
    annot=0;
    line=1;
});

$("#annotation-tool").click(function(){
    annot=1;
    line=0;
});


this.setListeners = function() {

     
	initialZoom = this.googleMap.getMap().getZoom();


  google.maps.event.addListenerOnce(globalMap, 'idle', function(){

    var mapLayer = new MapLayer();

    var currentHexPoint = new google.maps.Point(tooltip.getAbsolutePosition().x, tooltip.getAbsolutePosition().y); 
    var hexGeo = mapLayer.fromPointToLatLng(currentHexPoint, globalMap);
    initialZoom = globalMap.getZoom();

    });



    google.maps.event.addListener(globalMap, 'zoom_changed', function(event){ 


      var mapLayer = new MapLayer();     
      staticLayer.clear();
      var arrayToolTip = toolTips.returnArray();
    
      for (var i=0; i<arrayToolTip.length; i++) {

        var actualpixelMouse = mapLayer.fromLatLngToPoint(arrayToolTip[i][1], globalMap); //geoLocationSaved

        // new
        //actualpixelMouse.x += mapLayerState.getDiffX()-60;
        //actualpixelMouse.y += mapLayerState.getDiffY();    

        var newLayerPixelX = actualpixelMouse.x;// + mapLayerState.getDiffX() - 60;
        var newLayerPixelY = actualpixelMouse.y;// + mapLayerState.getDiffY();

        var newLayerPixel = new google.maps.Point(newLayerPixelX, newLayerPixelY);

      
        arrayToolTip[i][0].setAbsolutePosition(newLayerPixel);
        arrayToolTip[i][0].draw();
      }

      initialZoom = globalMap.getZoom();

    });

   
     
    this.overlay.getStage().getContent().addEventListener('mousedown', function(event){

        mapLayerState.setInitialPosition(event.clientX, event.clientY);
      
        if (annot===1) {

          toolTips.addToolTip(event.clientX, event.clientY);
          overlay.uploadNextObject();
        }

         
        if (line>0) {

          if (line===1) {
            lines.newRedLine();
            line++;
          }

          lines.getLastLine().points(lines.getLastLine().points().concat([mapLayerState.getInitPosX()-60, mapLayerState.getInitPosY()]));
          overlay.uploadLastLine();
        }

    });
     

    this.overlay.getStage().getContent().addEventListener('mouseup', function(event){
            
      mapLayerState.setInitialPosition(0,0);

    });

    
		
    this.overlay.getStage().getContent().addEventListener('mousemove', function(event){ 


    var currentLayerPoint = new google.maps.Point(event.clientX-60, event.clientY); 
    var mapLayer = new MapLayer();
    var curGeoPoint = mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);

    document.getElementById("text-debug2").innerHTML = "mouse move| loc lat:"+curGeoPoint.lat()+" lng:"+curGeoPoint.lng()+
    " mouse position| x:"+(event.clientX-60)+" y:"+event.clientY;



      var arrayToolTip = toolTips.returnArray();
      if ((typeof arrayToolTip !== 'undefined') && (arrayToolTip.length!==0)) {

       var mapLayer = new MapLayer();     
      
       //window.alert("hi"+arrayToolTip.length);

       var actualpixelMouse = mapLayer.fromLatLngToPoint(arrayToolTip[0][1], globalMap); //geoLocationSaved


       actualpixelMouse.x = actualpixelMouse.x - 60 + mapLayerState.getDiffX();
       actualpixelMouse.y = actualpixelMouse.y + mapLayerState.getDiffY();    
   
       //window.alert("hi");
 
      }



     if ((mapLayerState.getInitPosX() !== 0) && (mapLayerState.getInitPosY() !== 0)) {

          var mapLayer = new MapLayer();

          var finalPositionX = event.clientX;
          var finalPositionY = event.clientY;

            
          var initLatLong = globalMap.getCenter();
          var pixelpoint = globalMap.getProjection().fromLatLngToPoint(initLatLong);
          var zoom = globalMap.getZoom();

            
          pixelpoint.x = pixelpoint.x + (mapLayerState.getInitPosX() - finalPositionX) / Math.pow(2,zoom);
          pixelpoint.y = pixelpoint.y + (mapLayerState.getInitPosY() - finalPositionY) / Math.pow(2,zoom);

          var newpoint = globalMap.getProjection().fromPointToLatLng(pixelpoint);
           
          globalMap.setCenter(newpoint);

          mapLayerState.setDiff(mapLayerState.getDiffX()+mapLayerState.getInitPosX()-finalPositionX, 
            mapLayerState.getDiffY()+mapLayerState.getInitPosY()-finalPositionY);

          mapLayerState.setInitialPosition(finalPositionX, finalPositionY);
      }

    }); 

	}


	
}
