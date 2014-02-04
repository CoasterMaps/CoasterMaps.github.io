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





       // tooltip
      tooltip = new Kinetic.Label({
        x: 170,
        y: 75,
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
        shadowOffset: {x:10,y:20},
        shadowOpacity: 0.5
      }));
      
      tooltip.add(new Kinetic.Text({
        text: 'Tooltip pointing down',
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 5,
        fill: 'white'
      }));

      
     
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

      	//this.staticLayer.add(this.text);
      	//this.staticLayer.add(blueHex);
        //this.staticLayer.add(this.yellowHex);
        //this.staticLayer.add(this.redHex);

        this.staticLayer.add(tooltip);

        this.stage.add(this.staticLayer);

        staticLayer = this.staticLayer;
        stage = this.stage;
    }
	
}