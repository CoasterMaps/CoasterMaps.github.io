var blueHex;
var stage;
var staticLayer;

var worldpixelX;
var worldpixelY;

var pixelpoint;

// note
var tooltip;

function Overlay()
{

  this.setStage = function() {

    stage = new Kinetic.Stage({
      container: 'container',
      width: 2500,
      height: 1500,
      draggable: true
    });

    staticLayer = new Kinetic.Layer();

    stage.add(staticLayer);

  }


 this.getStage = function() {

   return stage;
 }


 this.getblueHex = function() {

   return blueHex;
 }

 this.setblueHex = function(newBlueHex) {

   blueHex = newBlueHex;
 }


 this.uploadOverlay = function() {

  staticLayer.clear();
  
  stage.add(staticLayer);
}


 this.uploadNextObject = function() {

  var arrayToolTip = toolTips.returnArray();
  var latestPosition = toolTips.returnCounter()-1;

  staticLayer.add(arrayToolTip[latestPosition][0]);
  arrayToolTip[latestPosition][0].draw();
 }


 this.uploadLastLine = function() {

  staticLayer.add(lines.getLastLineContainer().getLine());
  lines.getLastLineContainer().getLine().draw();
 }

 this.uploadLastLineHand = function() {

  staticLayer.add(handLines.getLastLineContainer().getLine());
  handLines.getLastLineContainer().getLine().draw();
 }


 this.uploadLastHandLine = function(lastLine, inputPoints) {

  lastLine.points(inputPoints);
  handLines.getLastLineContainer().getGeoPoints(inputPoints);
  lastLine.draw();
 }




  this.drawAnnot = function() {
    var arrayToolTip = toolTips.returnArray();
    
     if (arrayToolTip.length > 0) {
     
      for (var i=0; i<arrayToolTip.length; i++) {

        var actualpixelMouse = mapLayer.fromLatLngToPoint(arrayToolTip[i][1], globalMap); 

        var newLayerPixel = new google.maps.Point(actualpixelMouse.x, actualpixelMouse.y);

        arrayToolTip[i][0].setAbsolutePosition(newLayerPixel);
        arrayToolTip[i][0].draw();
      }
    }
  }

  this.drawLines = function() {
  
    var lineArray = lines.returnArray();
      // look through the lines
      
     if (lineArray.length > 0) {
      
      for (var i=0; i<lineArray.length; i++) {

          var newLineLayerArray = new Array();
          var newLineLayerArrayIndex = 0;

          var currentLine = lineArray[i];
          var geoPoints = currentLine.getGeoArray();

          // create new array of points for this line on the layer
          for (var counter=0; counter<geoPoints.length; counter++) {

            var actualPixel = mapLayer.fromLatLngToPoint(geoPoints[counter], globalMap); 

            newLineLayerArray[newLineLayerArrayIndex] = actualPixel.x + mapLayerState.getDiffX();
            newLineLayerArray[newLineLayerArrayIndex+1] = actualPixel.y + mapLayerState.getDiffY();
            newLineLayerArrayIndex+=2;
          }

          currentLine.getLine().points(newLineLayerArray);
          currentLine.getLine().draw();
      }
    }
  }




  this.drawHandLines = function() {

   
    var handlineArray = handLines.returnArray();
        // look through the lines
      if (handlineArray.length > 0) {
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
  } 


  this.deleteLast = function(lastType) {

    if (lastType === "line") {
     
      lines.getLastLineContainer().getLine().hide();
      lines.deleteLastLineContainer();  
    }

    else if (lastType === "annot") {
     
      var annotsArray = toolTips.returnArray();
     
      annotsArray[annotsArray.length-1][0].hide();
      toolTips.deleteItem();  
    }

    else if (lastType === "hand") {

      handLines.getLastLineContainer().getLine().hide();
      handLines.deleteLastLineContainer();
    }
    
    staticLayer.clear();

    this.drawLines();
    this.drawHandLines();
    this.drawAnnot();
  }


  this.hideAll = function() {

     var handlineArray = handLines.returnArray();
      if (handlineArray.length > 0) {
        for (var i=0; i<handlineArray.length; i++) {

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
        for (var i=0; i<lineArray.length; i++) {

          var newLineLayerArray = new Array();
          var newLineLayerArrayIndex = 0;

          var currentLine = lineArray[i];
         
          currentLine.getLine().hide();
        }
        lines.clearArray();
      }


     var arrayToolTip = toolTips.returnArray();
    
      if (arrayToolTip.length > 0) {
        for (var i=0; i<arrayToolTip.length; i++) {

          var actualpixelMouse = mapLayer.fromLatLngToPoint(arrayToolTip[i][1], globalMap); 

          var newLayerPixel = new google.maps.Point(actualpixelMouse.x, actualpixelMouse.y);

          arrayToolTip[i][0].hide();
        }
        toolTips.clearArray();
      }


    
  }


}