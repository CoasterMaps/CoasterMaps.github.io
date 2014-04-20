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

    var annotText = document.getElementById("annotName").value;
      
    tooltip.add(new Kinetic.Text({
        name: this.counter,  
        text: annotText,
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 5,
        fill: 'white'
    }));

    tooltip.on('dblclick', function(evt) {

        var shape=evt.targetNode;
        toolTips.deleteItemNumber(parseInt(shape.attrs.name));  
    });

    var toolTipGeo = new Array();

    toolTipGeo[0]=tooltip;
    
    var currentLayerPoint = new google.maps.Point(x-60, y);
    toolTipGeo[1]=mapLayer.fromPointToLatLng(currentLayerPoint, globalMap);
  
  	this.array[this.counter] = toolTipGeo;
  	this.counter++;
  } 

  this.deleteLastItem = function() {

    this.array.pop();
    this.counter--;
  }


  this.deleteItemNumber = function(num) {

    this.array[num][0].hide();
   
    if (this.array.length>1)  this.array.splice(num, 1);
    else {
      this.array = [];
      annotGlobalString="";
    }

    this.counter--;

    curViewQueue.newPrevView(curViewQueue.getCurrentView());
    var newAnnotString = curViewQueue.getCurrentView();

    staticLayer.clear(); 
    overlay.hideAll();
    
      
    if (newAnnotString!== undefined) {

      var saveDrawings = new Save();

      var res = newAnnotString.split("+");
            
      var newStr = "lines:" + res[1] + " "; 
      saveDrawings.getLines(res[1]);
      
      newStr += "handlines:" + res[2] + " "; 
      saveDrawings.getHandLines(res[2]);
      
      newStr += "annot:" + res[0] + " "; 
      saveDrawings.getAnnot(res[0]);

      document.getElementById("get-tool").disabled = true;
    }

  }



  this.returnArray = function() {

  	return this.array;
  } 

  this.clearArray = function() {

    this.array=[];
    this.counter=0;
  }

  this.returnCounter = function() {

    return this.counter;
  } 
     

}