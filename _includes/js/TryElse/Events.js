  var initialZoom=0;

  var mapLayerState = new MapLayerState();

  var line = 0;
  var annot = 0;
  var hand = 0;

  var isMouseHandDraw=false;
  var newline;
  var handpoints=[];
  var currentHandLine;



  function Events(inputMap, inputOverlay)
  {

    this.googleMap = inputMap;
    this.overlay = inputOverlay;


    $("#cancel-tool").click(function(){
      annot=0;
      line=0;
      hand=0;
    });

    $("#line-tool").click(function(){
      annot=0;
      line=1;
      hand=0;
    });

    $("#annotation-tool").click(function(){
      annot=1;
      line=0;
      hand=0;
    });

    $("#hand-tool").click(function(){
      annot=0;
      line=0;
      hand=1;
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

        var actualpixelMouse = mapLayer.fromLatLngToPoint(arrayToolTip[i][1], globalMap); 

        var newLayerPixel = new google.maps.Point(actualpixelMouse.x, actualpixelMouse.y);

        arrayToolTip[i][0].setAbsolutePosition(newLayerPixel);
        arrayToolTip[i][0].draw();
      }

      var lineArray = lines.returnArray();
        // look through the lines
        for (var i=0; i<lineArray.length; i++) {

          var newLineLayerArray = new Array();
          var newLineLayerArrayIndex = 0;

          var currentLine = lineArray[i];
          var geoPoints = currentLine.getGeoArray();


          // create new array of points for this line on the layer
          for (var counter=0; counter<geoPoints.length; counter++) {

            var actualPixel = mapLayer.fromLatLngToPoint(geoPoints[counter], globalMap); 

            newLineLayerArray[newLineLayerArrayIndex] = actualPixel.x + mapLayerState.getDiffX();
            
            newLineLayerArray[newLineLayerArrayIndex+1] =  actualPixel.y + mapLayerState.getDiffY();
            newLineLayerArrayIndex+=2;

          }

          currentLine.getLine().points(newLineLayerArray);
          currentLine.getLine().draw();
        }

        drawHandLines();

        initialZoom = globalMap.getZoom();

      });

  var drawHandLines = function() {

    var mapLayer = new MapLayer();

    var handlineArray = handLines.returnArray();
        // look through the lines
        for (var i=0; i<handlineArray.length; i++) {

          var newLineLayerArray = new Array();
          var newLineLayerArrayIndex = 0;

          var currentLine = handlineArray[i];
          var geoPoints = currentLine.getGeoArray();

          
          // create new array of points for this line on the layer
          for (var counter=0; counter<geoPoints.length; counter++) {

            var actualPixel = mapLayer.fromLatLngToPoint(geoPoints[counter], globalMap); 
            
            newLineLayerArray[newLineLayerArrayIndex] = actualPixel.x + mapLayerState.getDiffX();    
            newLineLayerArray[newLineLayerArrayIndex+1] =  actualPixel.y + mapLayerState.getDiffY();
            newLineLayerArrayIndex+=2;

          }

          currentLine.getLine().points(newLineLayerArray);
          currentLine.getLine().draw();
          
        }
      } 



      this.overlay.getStage().getContent().addEventListener('mousedown', function(event){

        mapLayerState.setInitialPosition(event.clientX, event.clientY);

    // annot tool trigger
    if (annot===1) {

      toolTips.addToolTip(event.clientX, event.clientY);
      overlay.uploadNextObject();
      isMouseHandDraw=false; 
      stage.draggable(true); 
    }


    // line tool trigger
    if (line>0) {

      if (line===1) {

        lines.newRedLine();
        line++;
      }

      lines.getLastLineContainer().addNewPoint(event.clientX-60, event.clientY);
      overlay.uploadLastLine();  
      isMouseHandDraw=false;  
      stage.draggable(true);       
    }


    // hand tool trigger
    if (hand===1) {

      stage.draggable(false);

      currentHandLine = handLines.newRedLine();

      isMouseHandDraw = true;
      handpoints=[];
      handpoints = handpoints.concat([event.clientX-60, event.clientY]);

      overlay.uploadLastHandLine(currentHandLine, handpoints);
    }

  });


      this.overlay.getStage().getContent().addEventListener('mouseup', function(event){

        mapLayerState.setInitialPosition(0,0);

        isMouseHandDraw=false;  
      });



      this.overlay.getStage().getContent().addEventListener('mousemove', function(event){ 

    // if hand drawing tool draw, else probably move map
    if(isMouseHandDraw) {
      
      handpoints = handpoints.concat([event.clientX-60, event.clientY]);
      overlay.uploadLastHandLine(currentHandLine, handpoints);
    }


    else if ((mapLayerState.getInitPosX() !== 0) && (mapLayerState.getInitPosY() !== 0)) {

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
