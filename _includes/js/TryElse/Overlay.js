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

	   this.stage = new Kinetic.Stage({
	   		container: 'container',
	   		width: $(window).width()-200,
	   		height: $(window).height(),
	   		draggable: true
	   	});

	    this.eventLayer = new Kinetic.Layer();
      this.staticLayer = new Kinetic.Layer();


      /*
       * leave center point positioned
       * at the default which is at the center
       * of the hexagon
       */
     
      stage = this.stage;
      staticLayer=this.staticLayer;     
	 }


	 this.getStage = function() {

	   	return this.stage;
    }

	 
	 this.getblueHex = function() {

	 	return blueHex;
	 }

	 this.setblueHex = function(newBlueHex) {

	 	blueHex = newBlueHex;
	 }


   this.uploadOverlay = function() {

      var arrayToolTip = toolTips.returnArray();
   
    //window.alert("hi2 "+arrayToolTip.length);

    this.staticLayer.clear();

      for (var i=0; i<arrayToolTip.length; i++) {

        this.staticLayer.add(arrayToolTip[i][0].draw());
      }


      this.stage.add(this.staticLayer);

     // staticLayer.clear();
     // tooltip.setAbsolutePosition(actualpixelMouse);
      
      staticLayer = this.staticLayer;
      stage = this.stage;
    }


    this.uploadNextObject = function() {

      var arrayToolTip = toolTips.returnArray();
      var latestPosition = toolTips.returnCounter() - 1;
    
      this.staticLayer.add(arrayToolTip[latestPosition][0]);

      this.stage.clear();
      this.stage.add(this.staticLayer);
      
      staticLayer = this.staticLayer;
      stage = this.stage;
    }


    this.uploadLastLine = function() {

      this.staticLayer.add(lines.getLastLineContainer().getLine());

      this.stage.clear();
      this.stage.add(this.staticLayer);
      
      staticLayer = this.staticLayer;
      stage = this.stage;
    }
	
}