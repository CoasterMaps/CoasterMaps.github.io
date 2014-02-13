function ToolTips()
{
   

  this.initArray = function() {

  	this.array = new Array();	
  	this.counter = 0;
  }


  this.addToolTip = function(x, y) {

    var tooltip = new Kinetic.Label({
        x: x-60+mapLayerState.getDiffX(),
        y: y+mapLayerState.getDiffY(),
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

    var mapLayer = new MapLayer();
    var toolTipGeo = new Array();
    

    toolTipGeo[0]=tooltip;
    
    // var newX=x-60+mapLayerState.getDiffX();
    // var newY=y+mapLayerState.getDiffY();

    //var currentLayerPoint = new google.maps.Point(x, y); 
    //toolTipGeo[1]=mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);

    var currentLayerPoint = new google.maps.Point(x-60, y);
    toolTipGeo[1]=mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);
  
    // mapLayer.fromPointToLatLng(currentHexPoint, globalMap);
    // window.alert("hi "+toolTipGeo[1].lat());

    document.getElementById("text-debug").innerHTML = "new pushpin| lat:"+toolTipGeo[1].lat()+" lng:"+toolTipGeo[1].lng();

   


  	this.array[this.counter] = toolTipGeo;
  	this.counter++;
  } 


  this.returnArray = function() {

   // window.alert("hi1 "+this.array.length);
  	return this.array;
  } 

  this.returnCounter = function() {

   // window.alert("hi1 "+this.array.length);
    return this.counter;
  } 
     

}