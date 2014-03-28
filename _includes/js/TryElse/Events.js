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


  window.addEventListener("keypress", function(e) { 
  
      var curPoint = globalMap.getProjection().fromLatLngToPoint(globalMap.getCenter());
      var pixelDiff = 0.0005;

     
      if ( (e.keyCode == 38) || (e.keyCode == 87) ) { 
        
        curPoint.y-=pixelDiff;   
        e.preventDefault(); 
      }

      else if ( (e.keyCode == 40) || (e.keyCode == 83) )  { 
      
        curPoint.y+=pixelDiff;
        e.preventDefault();
      }

      else if ( (e.keyCode == 37) || (e.keyCode == 65) )  { 
 
        curPoint.x-=pixelDiff;
        e.preventDefault();
      }

      else if ( (e.keyCode == 39) || (e.keyCode == 68) )   { 
     
        curPoint.x+=pixelDiff;
        e.preventDefault();
      }

     staticLayer.clear();

     var newCenter = globalMap.getProjection().fromPointToLatLng(curPoint); 
     globalMap.setCenter(newCenter);

     overlay.drawLines();
     overlay.drawHandLines();
     overlay.drawAnnot();   
   }); 

  

   var disableButton = function(buttonString) {

      //$(".btn").removeAttr('disabled');
      //$(buttonString).attr('disabled','disabled');

      console.log(buttonString);
    }



    $("#prev-tool").click(function(){

     var newAnnotString = curViewQueue.getPrevView();
     //window.alert("prev-tool annot:"+newAnnotString);
      if (newAnnotString!== undefined) {
     
      var saveDrawings = new Save();
      staticLayer.clear(); 
      overlay.hideAll();
     // var veraString = jsonstr;
      var res = newAnnotString.split("+");
      //window.alert("res splitted");
      //window.alert("gettingLines:"+res[1]);
      saveDrawings.getLines(res[1]);
      //window.alert("gettingHandLines:"+res[2]);
      saveDrawings.getHandLines(res[2]);
      //window.alert("gettingAnnot:"+res[0]);
      saveDrawings.getAnnot(res[0]);
      
      document.getElementById("get-tool").disabled = true;

    }
    });


    $("#next-tool").click(function(){

      var newAnnotString = curViewQueue.getNextView();

      if (newAnnotString!== undefined) {
      
      var saveDrawings = new Save();
      staticLayer.clear(); 
      overlay.hideAll();
     // var veraString = jsonstr;
      var res = newAnnotString.split("+");
      //window.alert("res splitted");
      //window.alert("gettingLines:"+res[1]);
      saveDrawings.getLines(res[1]);
      //window.alert("gettingHandLines:"+res[2]);
      saveDrawings.getHandLines(res[2]);
      //window.alert("gettingAnnot:"+res[0]);
      saveDrawings.getAnnot(res[0]);
      
      document.getElementById("get-tool").disabled = true;
    }
    });



    $("#cancel-tool").click(function(){
      var cancel_tool = this;
      annot=0;
      line=0;
      hand=0;
      disableButton(cancel_tool);

    });




    $("#line-tool").click(function(){
      annot=0;
      line=1;
      hand=0;
      disableButton("#line-tool"); 
    });
    


    $("#annotation-tool").click(function(){
      annot=1;
      line=0;
      hand=0;
      disableButton("#annotation-tool"); 
      
    });


    $("#hand-tool").click(function(){
      annot=0;
      line=0;
      hand=1;
      disableButton("#hand-tool"); 
      
    });

    $("#delete-tool").click(function(){
     
      overlay.deleteLast(currentToolType[currentToolTypePos-1]);
      currentToolTypePos--;  

      if (currentToolTypePos===0) {
        document.getElementById("#delete-tool").disabled = true; 
      }
      else {
        currentToolType.pop();
        document.getElementById("#delete-tool").disabled = false;
      }

    });


    $("#save-tool").click(function(){

     
    });
    

    $("#get-tool").click(function(){


     });


    


    this.setListeners = function() {

     initialZoom = this.googleMap.getMap().getZoom();

     google.maps.event.addListenerOnce(globalMap, 'idle', function(){
       
      var currentHexPoint = new google.maps.Point(tooltip.getAbsolutePosition().x, tooltip.getAbsolutePosition().y); 
      var hexGeo = mapLayer.fromPointToLatLng(currentHexPoint, globalMap);
      initialZoom = globalMap.getZoom();

    });



     google.maps.event.addListener(globalMap, 'zoom_changed', function(event){ 

      staticLayer.clear();

      overlay.drawLines();
      overlay.drawHandLines();
      overlay.drawAnnot();
      
      initialZoom = globalMap.getZoom();
    });




     this.overlay.getStage().getContent().addEventListener('mousedown', function(event){

      mapLayerState.setInitialPosition(event.clientX, event.clientY);


    // annot tool trigger
    if (annot===1) {


      toolTips.addToolTip(event.clientX, event.clientY);
      overlay.uploadNextObject();
      isMouseHandDraw=false; 
      stage.draggable(true); 
      document.getElementById("save-tool").disabled = false;
      document.getElementById("delete-tool").disabled = false;

      currentToolType[currentToolTypePos] = "annot";
      currentToolTypePos++;
      curViewQueue.newPrevView();
    }


    // line tool trigger
    else if (line>0) {

      stage.draggable(false);
      isMouseHandDraw=true; 

      if (line===1) {

        lines.newRedLine();
        line++;
        currentToolType[currentToolTypePos] = "line";
        currentToolTypePos++;
      }

      lines.getLastLineContainer().addNewPoint(event.clientX-60, event.clientY);
      overlay.uploadLastLine();  
      
      document.getElementById("save-tool").disabled = false;
      document.getElementById("delete-tool").disabled = false;
      curViewQueue.newPrevView();
    }


    // hand tool trigger
    else if (hand===1) {

      stage.draggable(false);
      isMouseHandDraw = true;

      currentToolType[currentToolTypePos] = "hand";
      currentToolTypePos++;

      currentHandLine = handLines.newRedLine();

      handpoints=[];
      handpoints = handpoints.concat([event.clientX-60+mapLayerState.getDiffX(), event.clientY+mapLayerState.getDiffY()]);

      overlay.uploadLastHandLine(currentHandLine, handpoints);
      document.getElementById("save-tool").disabled = false;
      document.getElementById("delete-tool").disabled = false;
    }

    else  {
      stage.draggable(true);
      isMouseHandDraw = false;
      document.getElementById("container").style["cursor"] = "move";
    }


  });


  this.overlay.getStage().getContent().addEventListener('mouseup', function(event){

    mapLayerState.setInitialPosition(0,0);

    isMouseHandDraw=false;  
    document.getElementById("container").style["cursor"] = "default";

  });



  this.overlay.getStage().getContent().addEventListener('mousemove', function(event){ 

    // if hand drawing tool draw, else probably move map
    if(isMouseHandDraw) {

      if (hand===1) {

        stage.draggable(false);

        handpoints = handpoints.concat([event.clientX-60+mapLayerState.getDiffX(), event.clientY+mapLayerState.getDiffY()]);

        overlay.uploadLastHandLine(currentHandLine, handpoints);
        stage.draggable(true);
         curViewQueue.newPrevView();
      }
      
    }


    else if ((mapLayerState.getInitPosX() !== 0) && (mapLayerState.getInitPosY() !== 0)) {

      
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
