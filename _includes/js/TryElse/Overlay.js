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
	   		width: $(window).width()-200,
	   		height: $(window).height(),
	   		draggable: true
	   	});

	    this.eventLayer = new Kinetic.Layer();
      staticLayer = new Kinetic.Layer();
 
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

      var arrayToolTip = toolTips.returnArray();
   
    
    staticLayer.clear();

      for (var i=0; i<arrayToolTip.length; i++) {

        staticLayer.add(arrayToolTip[i][0].draw());
      }


      stage.add(staticLayer);
    }


    this.uploadNextObject = function() {

      var arrayToolTip = toolTips.returnArray();
      var latestPosition = toolTips.returnCounter() - 1;
    
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
    
}