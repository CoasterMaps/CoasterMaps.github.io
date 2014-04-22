  var initialZoom = 0;

  var mapLayerState = new MapLayerState();

  var line = 0;
  var annot = 0;
  var hand = 0;
  var deleteMode = 0;

  var isMouseHandDraw = false;
  var newline;
  var handpoints = [];
  var currentHandLine;

  var prevDisabledButton="";




  function Events(inputMap, inputOverlay) {

      this.googleMap = inputMap;
      this.overlay = inputOverlay;


      window.addEventListener("keypress", function (e) {

          var charCode = String.fromCharCode(e.charCode);

          var curPoint = globalMap.getProjection().fromLatLngToPoint(globalMap.getCenter());
          var pixelDiff = 0.0005;


          if (charCode == 'w') {

              curPoint.y -= pixelDiff;
              e.preventDefault();
          } else if (charCode == 's') {

              curPoint.y += pixelDiff;
              e.preventDefault();
          } else if (charCode == 'a') {

              curPoint.x -= pixelDiff;
              e.preventDefault();
          } else if (charCode == 'd') {

              curPoint.x += pixelDiff;
              e.preventDefault();
          }

          staticLayer.clear();

          var newCenter = globalMap.getProjection().fromPointToLatLng(curPoint);
          globalMap.setCenter(newCenter);

          overlay.draw("lines");
          overlay.draw("handLines");
          overlay.drawAnnot();

      });



      var disableButton = function (buttonString) {

          document.getElementById(buttonString).disabled = true;
          if (prevDisabledButton !== "")
              document.getElementById(prevDisabledButton).disabled = false;
          prevDisabledButton = buttonString;

          console.log(buttonString);
      }



      $("#prev-tool").click(function () {

          uploadState(curViewQueue.getPrevView());
      });


      $("#next-tool").click(function () {

          uploadState(curViewQueue.getNextView());
      });


      function uploadState(inputState) {

          if (inputState !== undefined) {

              var saveDrawings = new Save();
              staticLayer.clear();


              overlay.hideAll();

              var res = inputState.split("+");

              saveDrawings.getLines("lines", res[1]);
              saveDrawings.getLines("handLines", res[2]);
              saveDrawings.getAnnot(res[0]);
          }
      }



      $("#cancel-tool").click(function () {
          var cancel_tool = this;
          annot = 0;
          line = 0;
          hand = 0;
          deleteMode = 0;
          disableButton("cancel-tool");

      });




      $("#line-tool").click(function () {
          annot = 0;
          line = 1;
          hand = 0;
          deleteMode = 0;
          disableButton("line-tool");
      });



      $("#annotation-tool").click(function () {
          annot = 1;
          line = 0;
          hand = 0;
          deleteMode = 0;
          disableButton("annotation-tool");

      });


      $("#hand-tool").click(function () {
          annot = 0;
          line = 0;
          hand = 1;
          deleteMode = 0;
          disableButton("hand-tool");

      });

      $("#delete-tool").click(function () {

          deleteMode = 1;
          annot = 0;
          line = 0;
          hand = 0;
          disableButton("delete-tool");

          /*overlay.deleteLast(currentToolType[currentToolTypePos - 1]);
          currentToolTypePos--;

          if (currentToolTypePos === 0) {
              document.getElementById("#delete-tool").disabled = true;
          } else {
              currentToolType.pop();
              document.getElementById("#delete-tool").disabled = false;
          }*/

      });


      $("#save-tool").click(function () {
          
           document.getElementById("save-tool").disabled = true;

          var arrayToolTip = toolTips.returnArray();
          var lineArray = lines.returnArray();
          var handlineArray = handLines.returnArray();

          var saveDrawings = new Save();

          if (arrayToolTip.length > 0) saveDrawings.saveAnnot(arrayToolTip);

          if (lineArray.length > 0) saveDrawings.saveLines(lineArray);

          if (handlineArray.length > 0) saveDrawings.saveHandLines(handlineArray);

          var jsonstr = ""
          if (typeof annotGlobalString != 'undefined') {
              jsonstr += annotGlobalString;
              jsonstr += "+";
          }
          if (typeof lineGlobalString != 'undefined') {
              jsonstr += lineGlobalString;
              jsonstr += "+";
          }
          if (typeof handLinesGlobalString != 'undefined') {
              jsonstr += handLinesGlobalString;
          }

          jQuery.post("", {
              json_annotation: JSON.stringify(jsonstr)
          }, function (a, b) {
              console.log(a, b)
          });
          

      });







      this.setListeners = function () {

          initialZoom = this.googleMap.getMap().getZoom();

          google.maps.event.addListenerOnce(globalMap, 'idle', function () {

              initialZoom = globalMap.getZoom();

          });



          google.maps.event.addListener(globalMap, 'zoom_changed', function (event) {

              staticLayer.clear();

              overlay.draw("lines");
              overlay.draw("handLines");
              overlay.drawAnnot();

              initialZoom = globalMap.getZoom();
          });




          this.overlay.getStage().getContent().addEventListener('mousedown', function (event) {

              mapLayerState.setInitialPosition(event.clientX, event.clientY);


              // annot tool trigger
              if (annot === 1) {

                  toolTips.addToolTip(event.clientX, event.clientY, document.getElementById("annotName").value.toString());
                  overlay.uploadNextObject();
                  isMouseHandDraw = false;
                  stage.draggable(true);

                  currentToolType.push("annot");
              }


              // line tool trigger
              else if (line > 0) {

                  stage.draggable(false);
                  isMouseHandDraw = true;

                  if (line === 1) {

                      lines.newRedLine();
                      line++;
                      currentToolType.push("line");
                  }

                  lines.getLastLineContainer().addNewPoint(event.clientX - 60, event.clientY);
                  overlay.uploadLastLine();
              }


              // hand tool trigger
              else if (hand === 1) {

                  stage.draggable(false);
                  isMouseHandDraw = true;

                  currentToolType.push("hand");

                  currentHandLine = handLines.newRedLine();

                  handpoints = [];
                  handpoints = handpoints.concat([event.clientX - 60 + mapLayerState.getDiffX(), event.clientY + mapLayerState.getDiffY()]);

                  overlay.uploadLastHandLine(currentHandLine, handpoints);

              } else {
                  stage.draggable(true);
                  isMouseHandDraw = false;
              }


          });


          this.overlay.getStage().getContent().addEventListener('mouseup', function (event) {

              mapLayerState.setInitialPosition(0, 0);

              isMouseHandDraw = false;
              document.getElementById("container").style["cursor"] = "default";

              //curViewQueue.newPrevView(curViewQueue.getCurrentView());

          });



          this.overlay.getStage().getContent().addEventListener('mousemove', function (event) {

              // if hand drawing tool draw, else probably move map
              if (isMouseHandDraw) {

                  if (hand === 1) {

                      stage.draggable(false);

                      handpoints = handpoints.concat([event.clientX - 60 + mapLayerState.getDiffX(), event.clientY + mapLayerState.getDiffY()]);

                      overlay.uploadLastHandLine(currentHandLine, handpoints);
                      stage.draggable(true);


                  }

              } else if ((mapLayerState.getInitPosX() !== 0) && (mapLayerState.getInitPosY() !== 0)) {


                  var finalPositionX = event.clientX;
                  var finalPositionY = event.clientY;


                  var initLatLong = globalMap.getCenter();
                  var pixelpoint = globalMap.getProjection().fromLatLngToPoint(initLatLong);
                  var zoom = globalMap.getZoom();


                  pixelpoint.x = pixelpoint.x + (mapLayerState.getInitPosX() - finalPositionX) / Math.pow(2, zoom);
                  pixelpoint.y = pixelpoint.y + (mapLayerState.getInitPosY() - finalPositionY) / Math.pow(2, zoom);

                  var newpoint = globalMap.getProjection().fromPointToLatLng(pixelpoint);

                  globalMap.setCenter(newpoint);

                  mapLayerState.setDiff(mapLayerState.getDiffX() + mapLayerState.getInitPosX() - finalPositionX,
                      mapLayerState.getDiffY() + mapLayerState.getInitPosY() - finalPositionY);

                  mapLayerState.setInitialPosition(finalPositionX, finalPositionY);
              }

          });

      }



  }

var globalMap;

function GoogleMap()
{

	    this.getMap = function() {

	    	return this.map;
	    }


	    this.getCenterPoint = function() {

	    	return this.point;
	    }
	  
    
	    this.initialize = function() {

	    	var mapOptions = {
	    		center: new google.maps.LatLng(50.582746,-2.464678),//64.555816,40.525793),//50.582746,-2.464678),//64.54785,40.561295
	    		mapTypeId: google.maps.MapTypeId.SATELLITE,
	    		zoom: 16,
	    		draggable: false
            };

            this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            globalMap = this.map;

            this.point = this.map.getCenter();
        }
        
}



var blueHex;
var stage;
var staticLayer;

var worldpixelX;
var worldpixelY;

var pixelpoint;

// note
var tooltip;

function Overlay() {

    this.setStage = function () {

        stage = new Kinetic.Stage({
            container: 'container',
            width: 2500,
            height: 1500,
            draggable: true
        });

        staticLayer = new Kinetic.Layer();

        stage.add(staticLayer);

    }


    this.getStage = function () {

        return stage;
    }


    this.getblueHex = function () {

        return blueHex;
    }

    this.setblueHex = function (newBlueHex) {

        blueHex = newBlueHex;
    }


    this.uploadOverlay = function () {

        staticLayer.clear();

        stage.add(staticLayer);
    }


    this.uploadNextObject = function () {

        var arrayToolTip = toolTips.returnArray();
        var latestPosition = toolTips.returnCounter() - 1;

        staticLayer.add(arrayToolTip[latestPosition][0]);
        arrayToolTip[latestPosition][0].draw();
    }


    this.uploadLastLine = function () {

        staticLayer.add(lines.getLastLineContainer().getLine());
        lines.getLastLineContainer().getLine().draw();
    }

    this.uploadLastLineHand = function () {

        staticLayer.add(handLines.getLastLineContainer().getLine());
        handLines.getLastLineContainer().getLine().draw();
    }


    this.uploadLastHandLine = function (lastLine, inputPoints) {

        lastLine.points(inputPoints);
        handLines.getLastLineContainer().getGeoPoints(inputPoints);
        lastLine.draw();
    }




    this.drawAnnot = function () {
        var arrayToolTip = toolTips.returnArray();

        if (arrayToolTip.length > 0) {

            for (var i = 0; i < arrayToolTip.length; i++) {

                var actualpixelMouse = mapLayer.fromLatLngToPoint(arrayToolTip[i][1], globalMap);

                var newLayerPixel = new google.maps.Point(actualpixelMouse.x, actualpixelMouse.y);

                arrayToolTip[i][0].setAbsolutePosition(newLayerPixel);
                arrayToolTip[i][0].draw();
            }
        }
    }


    this.draw = function (type) {
        
        var array;
        
        if (type === "handLines") {
            array = handLines.returnArray();    
        }
        else {   
            array = lines.returnArray();
        }
        
        // look through the lines
        if (array.length > 0) {
            for (var i = 0; i < array.length; i++) {

                var newLineLayerArray = new Array();

                var currentLine = array[i];
                var geoPoints = currentLine.getGeoArray();

                // create new array of points for this line on the layer
                for (var counter = 0; counter < geoPoints.length; counter++) {

                    var actualPixel = mapLayer.fromLatLngToPoint(geoPoints[counter], globalMap);

                    newLineLayerArray.push(actualPixel.x);
                    newLineLayerArray.push(actualPixel.y);
                }

                currentLine.getLine().points(newLineLayerArray);
                currentLine.getLine().draw();
            }
        }
    
    }


    this.deleteLast = function (lastType) {

        if (lastType === "line") {

            lines.getLastLineContainer().getLine().hide();
            lines.deleteLastLineContainer();
        } else if (lastType === "annot") {

            var annotsArray = toolTips.returnArray();

            annotsArray[annotsArray.length - 1][0].hide();
            toolTips.deleteItem();
        } else if (lastType === "hand") {

            handLines.getLastLineContainer().getLine().hide();
            handLines.deleteLastLineContainer();
        }

        staticLayer.clear();

        this.drawLines();
        this.drawHandLines();
        this.drawAnnot();
    }


    this.hideAll = function () {

        var handlineArray = handLines.returnArray();
        if (handlineArray.length > 0) {
            for (var i = 0; i < handlineArray.length; i++) {

                var newLineLayerArray = new Array();
                var newLineLayerArrayIndex = 0;

                var currentHandLine = handlineArray[i];

                currentHandLine.getLine().hide();
            }
            handLines.clearArray();
        }


        var lineArray = lines.returnArray();
        // look through the lines
        if (lineArray.length > 0) {
            for (var i = 0; i < lineArray.length; i++) {

                var newLineLayerArray = new Array();
                var newLineLayerArrayIndex = 0;

                var currentLine = lineArray[i];

                currentLine.getLine().hide();
            }
            lines.clearArray();
        }


        var arrayToolTip = toolTips.returnArray();

        if (arrayToolTip.length > 0) {
            for (var i = 0; i < arrayToolTip.length; i++) {

                var actualpixelMouse = mapLayer.fromLatLngToPoint(arrayToolTip[i][1], globalMap);

                var newLayerPixel = new google.maps.Point(actualpixelMouse.x, actualpixelMouse.y);

                arrayToolTip[i][0].hide();
            }
            toolTips.clearArray();
        }



    }


}

var overlay;
var toolTips;
var lines;
var handLines;

var mapLayer;

var currentToolType;
var currentToolTypePos;

var curViewQueue;

function SetEasel() {


    var googleMap = new GoogleMap();
    googleMap.initialize();

    document.getElementById("cancel-tool").disabled = false;
    document.getElementById("line-tool").disabled = false;
    document.getElementById("annotation-tool").disabled = false;
    document.getElementById("hand-tool").disabled = false;
    document.getElementById("delete-tool").disabled = false;
    //document.getElementById("get-tool").disabled = false;

    document.getElementById("save-tool").disabled = true;

    mapLayer = new MapLayer();

    overlay = new Overlay();


    toolTips = new ToolTips();
    toolTips.initArray();

    lines = new Lines();
    lines.initArray();


    handLines = new HandLines();
    handLines.initArray();


    overlay.setStage();


    overlay.uploadOverlay();
    currentToolType = new Array();
    currentToolTypePos = 0;



    curViewQueue = new CurrentDrawView();
    curViewQueue.initViewArray();




    var eventListener = new Events(googleMap, overlay);
    eventListener.setListeners();



    function get_value(callback) {
        jQuery.getJSON("", function (a, b) {

            d = JSON.stringify(a)
            callback(a)
        })
    }

    function get_annotation_from_database() {
        console.log("helo")
        $(document).ready(function () {
            get_value(function (value) {
               
                console.log(value)
                veraString = value;

                var saveDrawings = new Save();
                staticLayer.clear();

                var res = veraString.split("+");

                saveDrawings.getLines(res[0]);
                saveDrawings.getHandLines(res[1]);
                saveDrawings.getAnnot(res[2]);

                return value;
            });
        });
    }


}

function ToolTips() {


    this.initArray = function () {

        this.array = new Array();
    }


    this.addToolTip = function (x, y, name) {

        var tooltip = new Kinetic.Label({
            x: x - 60 + mapLayerState.getDiffX(),
            y: y + mapLayerState.getDiffY(),
            opacity: 0.75
        });

        tooltip.add(new Kinetic.Tag({
            fill: 'black',
            pointerDirection: 'down',
            pointerWidth: 10,
            pointerHeight: 10,
            lineJoin: 'round',
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffset: {
                x: 10,
                y: 20
            },
            shadowOpacity: 0.5
        }));

        
        tooltip.add(new Kinetic.Text({
            name: this.array.length,
            text: name, //annotText,
            fontFamily: 'Calibri',
            fontSize: 18,
            padding: 5,
            fill: 'white'
        }));

        tooltip.on('dblclick', function (evt) {
            
            if (deleteMode!==0) {
            var shape = evt.targetNode;
            toolTips.deleteItemNumber(parseInt(shape.attrs.name));
            }
        });

        var toolTipGeo = new Array();

        toolTipGeo[0] = tooltip;

        var currentLayerPoint = new google.maps.Point(x - 60, y);
        toolTipGeo[1] = mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);

        this.array.push(toolTipGeo);
     }

    this.deleteLastItem = function () {

        this.array.pop();
    }


    this.deleteItemNumber = function (num) {

        this.array[num][0].hide();

        if (this.array.length > 1) this.array.splice(num, 1);
        else {
            this.array = [];
            annotGlobalString = "";
        }

      
        curViewQueue.newPrevView(curViewQueue.getCurrentView());
        var newAnnotString = curViewQueue.getCurrentView();

        staticLayer.clear();
        overlay.hideAll();


        if (newAnnotString !== undefined) {

            var saveDrawings = new Save();

            var res = newAnnotString.split("+");

            saveDrawings.getLines("lines", res[1]);

            saveDrawings.getLines("handLines", res[2]);

            saveDrawings.getAnnot(res[0]);

        }

    }



    this.returnArray = function () {

        return this.array;
    }

    this.clearArray = function () {

        this.array = [];
    }

    this.returnCounter = function () {

        return this.array.length;
    }


}

function MapLayer()
{


 this.fromLatLngToPoint = function(latLng, map) {
    
      var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
      var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
      var scale = Math.pow(2, map.getZoom());
      var worldPoint = map.getProjection().fromLatLngToPoint(latLng);

      return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale-60, (worldPoint.y - topRight.y) * scale);
    }

   this.fromPointToLatLng = function(point, map) {

      point.x = point.x + 60;
    
      var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
      var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
      var scale = Math.pow(2, map.getZoom());
      
      var worldPoint = map.getProjection().fromPointToLatLng(
        new google.maps.Point(point.x/scale+bottomLeft.x, point.y/scale+topRight.y));

      return worldPoint;
    }





}

function Lines() {

    this.initArray = function () {

        this.array = new Array();
    }


    this.newRedLine = function () {

        var redLine = new Kinetic.Line({
            name: this.array.length,
            points: [],
            stroke: 'red',
            strokeWidth: globalLineStroke,
            lineCap: 'round',
            lineJoin: 'round'
        });

        redLine.on('dblclick', function (evt) {

            var shape = evt.targetNode;

            if (deleteMode !== 0) {

                lines.deleteItemNumber(parseInt(shape.attrs.name));
            }
        });

        var newLineContainer = new LineContainer(redLine);
        newLineContainer.getGeoPoints(redLine.points());

        this.array.push(newLineContainer);

        staticLayer.add(redLine);
    }


    this.deleteItemNumber = function (num) {

        this.array[num].getLine().hide();
        if (this.array.length > 1) this.array.splice(num, 1);
        else {
            this.array = [];
            lineGlobalString = "";
        }

        curViewQueue.newPrevView(curViewQueue.getCurrentView());
        var newAnnotString = curViewQueue.getCurrentView();

        staticLayer.clear();
        overlay.hideAll();

        if (newAnnotString !== undefined) {

            var saveDrawings = new Save();
            var res = newAnnotString.split("+");

            saveDrawings.getLines("lines", res[1]);
            saveDrawings.getLines("handLines", res[2]);
            saveDrawings.getAnnot(res[0]);
        }
    }


    this.returnArray = function () {

        return this.array;
    }

    this.clearArray = function () {

        this.array = [];
    }

    this.deleteLastLineContainer = function () {

        return this.array.pop();
    }

    this.getLastLineContainer = function () {

        return this.array[this.array.length - 1];
    }


}



function MapLayerState()
{

//this.clear();

    this.setInitialPosition = function(x,y) {
    	this.initialPositionX = x;
        this.initialPositionY = y;
    }

    this.setFinalPosition = function(x,y) {
    	this.finalPositionX = x;
        this.finalPositionY = y;
    }

    this.setDiff = function(x,y) {
    	this.initialDifferenceX = x;
        this.initialDifferenceY = y;
    }


    this.getInitPosX = function() {

    	if(typeof this.initialPositionX !== 'undefined')
    		return parseFloat(this.initialPositionX);
        else return 0;
    }
    this.getInitPosY = function() {

    	if(typeof this.initialPositionY !== 'undefined')
    		return parseFloat(this.initialPositionY);
        else return 0;
    }


    this.getFinalPosX = function() {

    	if(typeof this.finalPositionX !== 'undefined')
    		return parseFloat(this.finalPositionX);
        else return 0;
    }
    this.getFinalPosY = function() {

    	if(typeof this.finalPositionY !== 'undefined')
    		return parseFloat(this.finalPositionY);
        else return 0;
    }


    this.getDiffX = function() {

    	if(typeof this.initialDifferenceX !== 'undefined')
    		return parseFloat(this.initialDifferenceX);
        else return 0;
    }
    this.getDiffY = function() {

    	if(typeof this.initialDifferenceY !== 'undefined')
    		return parseFloat(this.initialDifferenceY);
        else return 0;
    }
    
}

function LineContainer(inputLine) {


	this.line = inputLine;

  //this.newGeoArray = new Array();
  //this.index = 0;
    
    

    this.getGeoPoints = function(points) {
       
        //var mapLayer = new MapLayer();

        var newGeoArray = new Array();
        var index = 0;

        for (var i = 0; i<points.length; i+=2) {
         
    		var currentLayerPoint = new google.maps.Point(points[i], points[i+1]); //-60
    		newGeoArray[index] = mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);
            index++;
        }

        this.geoPoints = newGeoArray;
        this.points = points; 
        return this.geoPoints;

    }


    this.getLine = function() {

    	return this.line;
    }


    this.getGeoArray = function() {

    	return this.geoPoints;
    }


    this.addNewPoint = function(x,y) {
     
      //var mapLayer = new MapLayer();

      //window.alert("diff x:"+mapLayerState.getDiffX()+" y:"+mapLayerState.getDiffY());

      this.line.points(this.line.points().concat([x+mapLayerState.getDiffX(), y+mapLayerState.getDiffY()]));

      var currentLayerPoint = new google.maps.Point(x, y);//-60
      this.geoPoints[this.geoPoints.length] = mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);
      

  }


  this.getLayerPoints = function() {

   return this.points;
}

}

function HandLines() {


    this.initArray = function () {

        this.array = new Array();
    }


    this.newRedLine = function () {

        var redLine = new Kinetic.Line({
            name: this.array.length,
            points: [],
            stroke: 'red',
            strokeWidth: globalHandLineStroke,
            lineCap: 'round',
            lineJoin: 'round'
        });

        redLine.on('dblclick', function (evt) {

            var shape = evt.targetNode;

            if (deleteMode !== 0) {

                handLines.deleteItemNumber(parseInt(shape.attrs.name));
            }

        });

        var newHandLineContainer = new HandLineContainer(redLine);
        newHandLineContainer.getGeoPoints(redLine.points());

        this.array.push(newHandLineContainer);

        staticLayer.add(redLine);

        return redLine;
    }


    this.deleteItemNumber = function (num) {

        this.array[num].getLine().hide();
        if (this.array.length > 1) this.array.splice(num, 1);
        else {
            this.array = [];
            handLinesGlobalString = "";
        }

        curViewQueue.newPrevView(curViewQueue.getCurrentView());
        var newAnnotString = curViewQueue.getCurrentView();

        staticLayer.clear();
        overlay.hideAll();

        if (newAnnotString !== undefined) {

            var saveDrawings = new Save();

            var res = newAnnotString.split("+");

            saveDrawings.getLines("lines", res[1]);
            saveDrawings.getLines("handLines", res[2]);
            saveDrawings.getAnnot(res[0]);
        }
    }


    this.deleteLastLineContainer = function () {
        this.array.pop();
    }

    this.returnArray = function () {

        return this.array;
    }

    this.clearArray = function () {

        this.array = [];
    }

    this.getLastLineContainer = function () {

        return this.array[this.array.length - 1];
    }


}

  function HandLineContainer(inputLine) {

  	this.line = inputLine;
    

    this.getGeoPoints = function(points) {
       
      var newGeoArray = new Array();
      
      for (var i = 0; i<points.length; i+=2) {

        var currentLayerPoint = new google.maps.Point(points[i], points[i+1]); 
        newGeoArray.push(mapLayer.fromPointToLatLng(currentLayerPoint, globalMap));
      }

      this.geoPoints = newGeoArray;
      this.points = points;

    }


    this.getLine = function() {

    	return this.line;
    }


    this.getGeoArray = function() {

    	return this.geoPoints;
    }


    this.addNewPoint = function(x,y) {
     
      this.line.points(this.line.points().concat([x, y]));

      var currentLayerPoint = new google.maps.Point(x, y); //-60
      this.geoPoints[this.geoPoints.length] = mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);
    }


    this.getLayerPoints = function() {

      return this.points;
    }

}

function CurrentDrawView() {


    this.initViewArray = function () {

        this.prevStates = new Array();
        this.nextStates = new Array();
        this.newPrevView(this.getCurrentView());
    };


    this.newPrevView = function (view) {

        this.prevStates.push(view);
    };


    this.getPrevView = function () {

        if (this.prevStates.length > 0) {

            var currentView = this.prevStates.pop();
            this.newNextView(currentView);

            var prevView = this.prevStates.pop();

            if (this.prevStates.length !== 0) {
                this.newPrevView(prevView);
            } else this.newNextView(prevView);


            var outString = "prevStates: " + "\n";
            for (var i = 0; i < this.prevStates.length; i++) {
                outString += "num " + i + ": " + this.prevStates[i] + "\n";
            }
        }

        return prevView;
    };


    this.newNextView = function (view) {

        this.nextStates.push(view);
    }


    this.getNextView = function () {

        if (this.nextStates.length > 0) {

            var nextView = this.nextStates.pop();

            this.newPrevView(nextView);


            var outString = "nextStates: " + "\n";
            for (var i = 0; i < this.nextStates.length; i++) {
                outString += "num " + i + ": " + this.nextStates[i] + "\n";
            }
        }

        return nextView;
    }


    this.getCurrentView = function () {
        
        document.getElementById("save-tool").disabled = false;
        //window.alert("get view");

        var saveDrawings = new Save();

        var arrayToolTip = toolTips.returnArray();
        var lineArray = lines.returnArray();
        var handlineArray = handLines.returnArray();

        if (arrayToolTip.length > 0)
            saveDrawings.saveAnnot(arrayToolTip);
        if (lineArray.length > 0)
            saveDrawings.saveLines("lines", lineArray);
        if (handlineArray.length > 0)
            saveDrawings.saveLines("handLines", handlineArray);

        var curSavedView = annotGlobalString + "+" + lineGlobalString + "+" + handLinesGlobalString;

        return curSavedView;
    }


}

  var annotGlobalString;
  var lineGlobalString;
  var handLinesGlobalString;


  function Save() {



      this.saveAnnot = function (annotArray) {

          var newStringAnnotArray = [{
              "lat": annotArray[0][1].lat().toString(),
              "lng": annotArray[0][1].lng().toString(),
              "name": annotArray[0][0].children[1].partialText
          }];

          for (var i = 1; i < annotArray.length; i++) {

              var stringLat = annotArray[i][1].lat().toString();
              var stringLng = annotArray[i][1].lng().toString();
              var annotName = annotArray[i][0].children[1].partialText;

              newStringAnnotArray = newStringAnnotArray.concat([{
                  "lat": stringLat,
                  "lng": stringLng,
                  "name": annotName
              }]);
          }

          var finalArray = {
              "annot": newStringAnnotArray
          };

          var myJsonString = JSON.stringify(finalArray);

          annotGlobalString = myJsonString;
      }


      this.getAnnot = function (inputAnnot) {

          if (inputAnnot !== 'undefined') {

              var myJsonString = inputAnnot;

              this.obj = JSON.parse(myJsonString);

              if (typeof this.obj.annot !== 'undefined') {

                  for (var i = 0; i < this.obj.annot.length; i++) {

                      var curLatLng = new google.maps.LatLng(this.obj.annot[i].lat, this.obj.annot[i].lng);

                      var actualpixelMouse = mapLayer.fromLatLngToPoint(curLatLng, globalMap);
                      var newLayerPixel = new google.maps.Point(actualpixelMouse.x + 60, actualpixelMouse.y);


                      toolTips.addToolTip(newLayerPixel.x, newLayerPixel.y, this.obj.annot[i].name);

                      overlay.uploadNextObject();
                  }

              }

          }

      }




      this.saveLines = function (type, inputLinesArray) {

          var newLine = [];
          var lineGeoPoints = [];

          if (inputLinesArray !== 'undefined') {

              for (var i = 0; i < inputLinesArray.length; i++) {

                  var geoPointsArray = inputLinesArray[i].getGeoArray();

                  for (var ii = 0; ii < geoPointsArray.length; ii++) {

                      var stringLat = geoPointsArray[ii].lat().toString();
                      var stringLng = geoPointsArray[ii].lng().toString();

                      lineGeoPoints = lineGeoPoints.concat([{
                          "point": {
                              "lat": stringLat,
                              "lng": stringLng
                          }
                  }]);
                  }

                  newLine = newLine.concat([{
                      "line": lineGeoPoints
              }]);

                  lineGeoPoints = [];
              }

              var finalArray = {
                  "linesArray": newLine
              };

              var myJsonString = JSON.stringify(finalArray);

              if (type === "handLines") {
                  handLinesGlobalString = myJsonString;
              } else if (type === "lines") {
                  lineGlobalString = myJsonString;
              }
          }
      }





      this.getLines = function (type, inputLines) {

          if ((inputLines !== 'undefined') && (inputLines !== "")) {

              this.obj = JSON.parse(inputLines);

              if (typeof this.obj.linesArray !== 'undefined') {

                  // loop through lines
                  for (var i = 0; i < this.obj.linesArray.length; i++) {

                      var curLine = this.obj.linesArray[i].line;

                      if (type === "handLines") {
                          handLines.newRedLine();
                      } else {
                          lines.newRedLine();
                      }

                      // parse through points
                      for (var ii = 0; ii < curLine.length; ii++) {

                          var curLat = parseFloat(curLine[ii].point.lat); // parseFloat()
                          var cutLng = parseFloat(curLine[ii].point.lng); // parseFloat()

                          var latLng = new google.maps.LatLng(curLat, cutLng);

                          var curPoint = mapLayer.fromLatLngToPoint(latLng, globalMap);


                          if (type === "handLines") {
                              handLines.getLastLineContainer().addNewPoint(curPoint.x, curPoint.y);
                          } else {
                              lines.getLastLineContainer().addNewPoint(curPoint.x, curPoint.y);
                          }
                      }
                  }

                  overlay.draw(type);
              }
          }

      }




  }

/* =========================================================
 * bootstrap-slider.js v2.0.0
 * http://www.eyecon.ro/bootstrap-slider
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
 
!function( $ ) {

	var Slider = function(element, options) {
		this.element = $(element);
		this.picker = $('<div class="slider">'+
							'<div class="slider-track">'+
								'<div class="slider-selection"></div>'+
								'<div class="slider-handle"></div>'+
								'<div class="slider-handle"></div>'+
							'</div>'+
							'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'+
						'</div>')
							.insertBefore(this.element)
							.append(this.element);
		this.id = this.element.data('slider-id')||options.id;
		if (this.id) {
			this.picker[0].id = this.id;
		}

		if (typeof Modernizr !== 'undefined' && Modernizr.touch) {
			this.touchCapable = true;
		}

		var tooltip = this.element.data('slider-tooltip')||options.tooltip;

		this.tooltip = this.picker.find('.tooltip');
		this.tooltipInner = this.tooltip.find('div.tooltip-inner');

		this.orientation = this.element.data('slider-orientation')||options.orientation;
		switch(this.orientation) {
			case 'vertical':
				this.picker.addClass('slider-vertical');
				this.stylePos = 'top';
				this.mousePos = 'pageY';
				this.sizePos = 'offsetHeight';
				this.tooltip.addClass('right')[0].style.left = '100%';
				break;
			default:
				this.picker
					.addClass('slider-horizontal')
					.css('width', this.element.outerWidth());
				this.orientation = 'horizontal';
				this.stylePos = 'left';
				this.mousePos = 'pageX';
				this.sizePos = 'offsetWidth';
				this.tooltip.addClass('top')[0].style.top = -this.tooltip.outerHeight() - 14 + 'px';
				break;
		}

		this.min = this.element.data('slider-min')||options.min;
		this.max = this.element.data('slider-max')||options.max;
		this.step = this.element.data('slider-step')||options.step;
		this.value = this.element.data('slider-value')||options.value;
		if (this.value[1]) {
			this.range = true;
		}

		this.selection = this.element.data('slider-selection')||options.selection;
		this.selectionEl = this.picker.find('.slider-selection');
		if (this.selection === 'none') {
			this.selectionEl.addClass('hide');
		}
		this.selectionElStyle = this.selectionEl[0].style;


		this.handle1 = this.picker.find('.slider-handle:first');
		this.handle1Stype = this.handle1[0].style;
		this.handle2 = this.picker.find('.slider-handle:last');
		this.handle2Stype = this.handle2[0].style;

		var handle = this.element.data('slider-handle')||options.handle;
		switch(handle) {
			case 'round':
				this.handle1.addClass('round');
				this.handle2.addClass('round');
				break
			case 'triangle':
				this.handle1.addClass('triangle');
				this.handle2.addClass('triangle');
				break
		}

		if (this.range) {
			this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
			this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
		} else {
			this.value = [ Math.max(this.min, Math.min(this.max, this.value))];
			this.handle2.addClass('hide');
			if (this.selection == 'after') {
				this.value[1] = this.max;
			} else {
				this.value[1] = this.min;
			}
		}
		this.diff = this.max - this.min;
		this.percentage = [
			(this.value[0]-this.min)*100/this.diff,
			(this.value[1]-this.min)*100/this.diff,
			this.step*100/this.diff
		];

		this.offset = this.picker.offset();
		this.size = this.picker[0][this.sizePos];

		this.formater = options.formater;

		this.layout();

		if (this.touchCapable) {
			// Touch: Bind touch events:
			this.picker.on({
				touchstart: $.proxy(this.mousedown, this)
			});
		} else {
			this.picker.on({
				mousedown: $.proxy(this.mousedown, this)
			});
		}

		if (tooltip === 'show') {
			this.picker.on({
				mouseenter: $.proxy(this.showTooltip, this),
				mouseleave: $.proxy(this.hideTooltip, this)
			});
		} else {
			this.tooltip.addClass('hide');
		}
	};

	Slider.prototype = {
		constructor: Slider,

		over: false,
		inDrag: false,
		
		showTooltip: function(){
			this.tooltip.addClass('in');
			//var left = Math.round(this.percent*this.width);
			//this.tooltip.css('left', left - this.tooltip.outerWidth()/2);
			this.over = true;
		},
		
		hideTooltip: function(){
			if (this.inDrag === false) {
				this.tooltip.removeClass('in');
			}
			this.over = false;
		},

		layout: function(){
			this.handle1Stype[this.stylePos] = this.percentage[0]+'%';
			this.handle2Stype[this.stylePos] = this.percentage[1]+'%';
			if (this.orientation == 'vertical') {
				this.selectionElStyle.top = Math.min(this.percentage[0], this.percentage[1]) +'%';
				this.selectionElStyle.height = Math.abs(this.percentage[0] - this.percentage[1]) +'%';
			} else {
				this.selectionElStyle.left = Math.min(this.percentage[0], this.percentage[1]) +'%';
				this.selectionElStyle.width = Math.abs(this.percentage[0] - this.percentage[1]) +'%';
			}
			if (this.range) {
				this.tooltipInner.text(
					this.formater(this.value[0]) + 
					' : ' + 
					this.formater(this.value[1])
				);
				this.tooltip[0].style[this.stylePos] = this.size * (this.percentage[0] + (this.percentage[1] - this.percentage[0])/2)/100 - (this.orientation === 'vertical' ? this.tooltip.outerHeight()/2 : this.tooltip.outerWidth()/2) +'px';
			} else {
				this.tooltipInner.text(
					this.formater(this.value[0])
				);
				this.tooltip[0].style[this.stylePos] = this.size * this.percentage[0]/100 - (this.orientation === 'vertical' ? this.tooltip.outerHeight()/2 : this.tooltip.outerWidth()/2) +'px';
			}
		},

		mousedown: function(ev) {

			// Touch: Get the original event:
			if (this.touchCapable && ev.type === 'touchstart') {
				ev = ev.originalEvent;
			}

			this.offset = this.picker.offset();
			this.size = this.picker[0][this.sizePos];

			var percentage = this.getPercentage(ev);

			if (this.range) {
				var diff1 = Math.abs(this.percentage[0] - percentage);
				var diff2 = Math.abs(this.percentage[1] - percentage);
				this.dragged = (diff1 < diff2) ? 0 : 1;
			} else {
				this.dragged = 0;
			}

			this.percentage[this.dragged] = percentage;
			this.layout();

			if (this.touchCapable) {
				// Touch: Bind touch events:
				$(document).on({
					touchmove: $.proxy(this.mousemove, this),
					touchend: $.proxy(this.mouseup, this)
				});
			} else {
				$(document).on({
					mousemove: $.proxy(this.mousemove, this),
					mouseup: $.proxy(this.mouseup, this)
				});
			}

			this.inDrag = true;
			var val = this.calculateValue();
			this.element.trigger({
					type: 'slideStart',
					value: val
				}).trigger({
					type: 'slide',
					value: val
				});
			return false;
		},

		mousemove: function(ev) {
			
			// Touch: Get the original event:
			if (this.touchCapable && ev.type === 'touchmove') {
				ev = ev.originalEvent;
			}

			var percentage = this.getPercentage(ev);
			if (this.range) {
				if (this.dragged === 0 && this.percentage[1] < percentage) {
					this.percentage[0] = this.percentage[1];
					this.dragged = 1;
				} else if (this.dragged === 1 && this.percentage[0] > percentage) {
					this.percentage[1] = this.percentage[0];
					this.dragged = 0;
				}
			}
			this.percentage[this.dragged] = percentage;
			this.layout();
			var val = this.calculateValue();
			this.element
				.trigger({
					type: 'slide',
					value: val
				})
				.data('value', val)
				.prop('value', val);
			return false;
		},

		mouseup: function(ev) {
			if (this.touchCapable) {
				// Touch: Bind touch events:
				$(document).off({
					touchmove: this.mousemove,
					touchend: this.mouseup
				});
			} else {
				$(document).off({
					mousemove: this.mousemove,
					mouseup: this.mouseup
				});
			}

			this.inDrag = false;
			if (this.over == false) {
				this.hideTooltip();
			}
			this.element;
			var val = this.calculateValue();
			this.element
				.trigger({
					type: 'slideStop',
					value: val
				})
				.data('value', val)
				.prop('value', val);
			return false;
		},

		calculateValue: function() {
			var val;
			if (this.range) {
				val = [
					(this.min + Math.round((this.diff * this.percentage[0]/100)/this.step)*this.step),
					(this.min + Math.round((this.diff * this.percentage[1]/100)/this.step)*this.step)
				];
				this.value = val;
			} else {
				val = (this.min + Math.round((this.diff * this.percentage[0]/100)/this.step)*this.step);
				this.value = [val, this.value[1]];
			}
			return val;
		},

		getPercentage: function(ev) {
			if (this.touchCapable) {
				ev = ev.touches[0];
			}
			var percentage = (ev[this.mousePos] - this.offset[this.stylePos])*100/this.size;
			percentage = Math.round(percentage/this.percentage[2])*this.percentage[2];
			return Math.max(0, Math.min(100, percentage));
		},

		getValue: function() {
			if (this.range) {
				return this.value;
			}
			return this.value[0];
		},

		setValue: function(val) {
			this.value = val;

			if (this.range) {
				this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
				this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
			} else {
				this.value = [ Math.max(this.min, Math.min(this.max, this.value))];
				this.handle2.addClass('hide');
				if (this.selection == 'after') {
					this.value[1] = this.max;
				} else {
					this.value[1] = this.min;
				}
			}
			this.diff = this.max - this.min;
			this.percentage = [
				(this.value[0]-this.min)*100/this.diff,
				(this.value[1]-this.min)*100/this.diff,
				this.step*100/this.diff
			];
			this.layout();
		}
	};

	$.fn.slider = function ( option, val ) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('slider'),
				options = typeof option === 'object' && option;
			if (!data)  {
				$this.data('slider', (data = new Slider(this, $.extend({}, $.fn.slider.defaults,options))));
			}
			if (typeof option == 'string') {
				data[option](val);
			}
		})
	};

	$.fn.slider.defaults = {
		min: 0,
		max: 10,
		step: 1,
		orientation: 'horizontal',
		value: 5,
		selection: 'before',
		tooltip: 'show',
		handle: 'round',
		formater: function(value) {
			return value;
		}
	};

	$.fn.slider.Constructor = Slider;

}( window.jQuery );
